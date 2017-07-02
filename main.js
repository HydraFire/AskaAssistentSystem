
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
  if(message == '' ||
     message == '_mute_'){
  }else{
    ws.send(message)
  }
}
exports.sendToAska = sendToAska;
//Подключение функции работаюшей с нейросетью ////////////////////
const set_to_run = require('./aska_script/neural_network').set_to_run;
const calc_layers = require('./aska_script/neural_network').calc_layers;
global.attention = 'LISTEN'
global.strx = ['null','null','null']
//////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
function somebodyConnected(ws){
  let message = 'SYSTEM';
  let userInfo = 'Ваш пользователь: '+ws.x_user;
  message += userInfo+'<br><br>'
  let version = 'Текущая версия программы 0.301<br>'
  message += version+'<br>'
  let way = './JSON/data/'+ws.x_user+'/NN_Train.json'
  let way2 = './JSON/data/'+ws.x_user+'/NN_train_buffer.json'
  //try{
  //let brainSize = jetpack.inspect(way2).size
  //}catch(err){console.log(err);brainSize =10000000}
  let arrL = calc_layers(way,ws)
  message += '<br>'
  message += '[ входящий слой:  '+arrL[0]+'  ]<br>'
  message += '[ внутрених нейронов:  '+arrL[1]+'  ]<br>'
  message += '[ выходяший слой:  '+arrL[2]+'  ]<br>'
  message += '<br>'
  //message += 'Размер нейро сети '+(brainSize/1000000).toFixed(2)+' МБ.'
  ws.send(message)
}
//// WebSocketServer ///////////////////////////////////////////////
var WebSocketServer = require("ws").Server,
    http = require("http"),
    exp = express(),
    server = http.createServer(exp);

exp.use(express.static(__dirname + '/public'));
server.listen(80);

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
      global[ws.x_user] = [' ',' ',' ',' ',' ']
    }
    console.log('SYSTEM')
    somebodyConnected_log(ws,id,message)
    console.log('TATA')
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
      }else if(message.toString().includes('LISTEN')){
        global.attention = 'LISTEN'
        global.strx[2] = 'ASKA'
        console.log('LISTEN')
      }else if(message.toString().includes('FILE')){
        message = message.substring(4,message.length)
        console.log(message)
        global.save_file_name = message
      }else{
        console.log(global.attention)
        if(global.attention == 'LISTEN'){
          if(ws.x_user != message.toString()){
            global[ws.x_user].push(message.toString())
            global[ws.x_user].splice(0,1)
          }
          console.log(global[ws.x_user])
          set_to_run(message.toString(),ws);
        }
      }
    }
  });
});


///////////////////////////////////////////////////////////////////////
