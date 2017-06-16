
//const electron = require('electron');
//const jetpack = require('fs-jetpack');
const express = require("express")
//const app = express()//electron.app;  // Module to control application life.
//app.on('window-all-closed', () => {
//  console.log('не закрывает сервер после закрытия окна')
//})
//const BrowserWindow = electron.BrowserWindow;
const jetpack = require('fs-jetpack');
//const windowManager = require('electron-window-manager');

//Обявление Mesengera //////////////////////////////////////////
const sendToAska = function (message,ws){
  if(message != ''){
  ws.send(message)
  }
}
exports.sendToAska = sendToAska;
//Подключение функции работаюшей с нейросетью ////////////////////
const set_to_run = require('./aska_script/neural_network').set_to_run;
const calc_layers = require('./aska_script/neural_network').calc_layers;
//////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
function somebodyConnected(ws){
  let message = 'SYSTEM';
  let userInfo = 'Ваш пользователь: '+ws.x_user;
  message += userInfo+'<br><br>'
  let version = 'Текущая версия программы 0.301<br>'
  message += version+'<br>'
  let brainSize = jetpack.inspect('JSON/NN_train_buffer.json').size
  let arrL = calc_layers()
  message += '<br>'
  message += '[ входящий слой:  '+arrL[0]+'  ]<br>'
  message += '[ внутрених нейронов:  '+arrL[1]+'  ]<br>'
  message += '[ выходяший слой:  '+arrL[2]+'  ]<br>'
  message += '<br>'
  message += 'Размер нейро сети '+(brainSize/1000000).toFixed(2)+' МБ.'
  ws.send(message)
}
//// WebSocketServer ///////////////////////////////////////////////
var WebSocketServer = require("ws").Server,
    http = require("http"),
    exp = express(),
    server = http.createServer(exp);

exp.use(express.static(__dirname + '/public'));
server.listen(8080);

function somebodyConnected_log(ws,id,message){
  if(message.length > 2000){
    let message2 = 'SYSTEM слишком большой ФАЙЛ';
    ws.send(message2)
  }else{

    let message2 = 'SYSTEM';
    message2 += JSON.stringify(id)+'  '+message;
    ws.send(message2)
  }
}


var wss = new WebSocketServer({server: server});
wss.on("connection", function(ws){
 
  global.close_all_intervals = 0
  ws.addEventListener("close",()=>{
    global.close_all_intervals = 100000
    console.log('CLOSE')
  })
  ws.on('message', function(message,id) {
    let data = message.toString()
    if(data.substring(0,4) == 'USER'){
      message = message.toString().substring(4,message.length);
      
      let arr_ip_id = [
        ['HydraFire','159.224.183.122'],
        ['HydraFire','159.224.183.122'],
        ['Noir','46.30.41.26']
      ]
      arr_ip_id.some(v=>{
        if(v[1] == message){ return message = v[0]}else{message = message}
      })
      ws['x_user'] = message;
      console.log('CONECTION '+ws.x_user)
      somebodyConnected(ws)
      global.silence = false
      global.playing_music = 'none'
    }
    somebodyConnected_log(ws,id,message)

    if(message.length > 2000){
      let type = global.save_file_name
      type = type.substring(type.length-3,type.length)
      let adres = 'public/files/'+global.save_file_name
      if(type == 'mp3'){
        adres = 'public/files/music/'+global.save_file_name
      }
      console.log(adres)
      jetpack.write(adres,message)
      ws.send('SYSTEMFile UPLOAD "'+adres+'"')
    }else{
      if(message.toString().includes('SHUT_UP')){
        global.aska_state_01 = true
      }else if(message.toString().includes('SPEECH')){
        global.aska_state_01 = false
      }else if(message.toString().includes('FILE')){
        message = message.substring(4,message.length)
        console.log(message)
        global.save_file_name = message
      }else{
        global[ws.x_user] = message.toString()
        global.aska_state_00 = message.toString()
        set_to_run(message.toString(),ws);
      }
    }
  });
});


///////////////////////////////////////////////////////////////////////
