
//const electron = require('electron');
//const jetpack = require('fs-jetpack');
const express = require("express")
//const app = express()//electron.app;  // Module to control application life.
//app.on('window-all-closed', () => {
//  console.log('не закрывает сервер после закрытия окна')
//})
/*
const get = require('simple-get')
get({
  url: 'http://online.anidub.com/anime_tv/anime_ongoing/10139-berserk-tv-3-berserk-tv-3-01-iz-12.html',
  method: 'POST',
  body: 'this is the POST body',

  // simple-get accepts all options that node.js `http` accepts 
  // See: http://nodejs.org/api/http.html#http_http_request_options_callback 
  headers: {
    'user-agent': 'my cool app'
  }
}, function (err, res) {
  console.log(err)
 
  // All properties/methods from http.IncomingResponse are available, 
  // even if a gunzip/inflate transform stream was returned. 
  // See: http://nodejs.org/api/http.html#http_http_incomingmessage 
  res.setTimeout(10000)
  //console.log(res.headers)
  let n = 0
  res.on('data', function (chunk) {
    // `chunk` is the decoded response, after it's been gunzipped or inflated 
    // (if applicable) 
   // console.log('got a chunk of the response: ' + chunk)
   
   //Добавлено
   
  // console.log(gji)
   
   n+=1
   if(n == 5){
     let gjk = chunk.toString()
     let gji = gjk.search('Добавлено:')
     console.log(gji)
   //  let jio = gjk.substring(gji,gji+30)
   console.log(gjk)
   }
  })
}
   )

*/


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
    if(message.length > 80){
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
        if(ws.x_user != message.toString()){
          global[ws.x_user].push(message.toString())
          global[ws.x_user].splice(0,1)
        }

        //global.aska_state_00 = message.toString()
        console.log(global[ws.x_user])
        set_to_run(message.toString(),ws);
      }
    }
  });
});


///////////////////////////////////////////////////////////////////////
