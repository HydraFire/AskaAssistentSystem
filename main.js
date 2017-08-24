
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

const registration = require('./aska_script/registration');
const napominalka = require('./aska_script/napominalka');
const askaDJ = require('./aska_script/aska_DJ');
//Подключение функции работаюшей с нейросетью ////////////////////
const set_to_run = require('./aska_script/neural_network').set_to_run;

//global.attention = 'LISTEN'
//////////////////////////////////////////////////////////////////
//// WebSocketServer ///////////////////////////////////////////////
const WebSocketServer = require("ws").Server
const https = require("https")
const exp = express()


var fs = require('fs');

var key = fs.readFileSync('./public/users/HydraFire/private.key');
var cert = fs.readFileSync( './public/users/HydraFire/primary.crt' );
var ca = fs.readFileSync( './public/users/HydraFire/intermediate.crt' );

var options = {
  key: key,
  cert: cert,
  ca:ca
};

var server = https.createServer(options,exp).listen(443);
exp.use(express.static(__dirname + '/public'));
//server;

function somebodyConnected_log(ws,message){
  if(message.length > 2000){
    let message2 = 'SYSTEM слишком большой ФАЙЛ';
    ws.send(message2)
  }else{
    let message2 = 'SYSTEM';
    message2 += '  '+message;
    ws.send(message2)
  }
}

global.aska_play_music = false /// < ------------------------
//////////////////////WebSocket/////////////////////////////////

var wss = new WebSocketServer({server: server});

wss.on("connection", function(ws){

  ws.users = []
  ws.users.aska_play_music = false


  let user_ip = ws._socket.remoteAddress
  user_ip = user_ip.substring(7,user_ip.length)
  if(user_ip == '159.224.183.122'){
    //ws.send('Доступ розрешон')
    let login_data = 'USERHydraFire||1||159.224.183.122'
    registration.login(ws,login_data)
  }else{
    //ws.send('Доступ в общественую ветку')
    let login_data = 'USERundefined||public||'+user_ip
    registration.login(ws,login_data)
  }
  console.log(user_ip)


  ws.on('message', function(message) {
    try{
      let str_m = message.toString()
      if(str_m.substring(0,4) == 'USER'){
        message = registration.login(ws,message)
      }
      //console.log('SYSTEM '+message)
      somebodyConnected_log(ws,message)


      if(message.length > 2000){
        let type = ws.users.save_file_name
        type = type.substring(type.length-3,type.length)
        let adres = 'public/users/'+ws.users.name
        if(type == 'mp3'){
          adres = 'public/users/'+ws.users.name+'/music'
        }else if(type == 'mp4' && ws.users.track != 'none'){
          adres = 'public/users/'+ws.users.name+'/video'
          askaDJ.add_video(ws)
        }
        let msize = jetpack.inspectTree(adres)
        console.log(adres)
        if(msize == null){
          jetpack.write(adres+'/'+ws.users.save_file_name,message)
          ws.send('SYSTEMFile UPLOAD "'+adres+'"')
        }else
          if(ws.users.name == 'HydraFire'){
            if(msize.size < 10000000000){
              console.log(msize.size)
              jetpack.write(adres+'/'+ws.users.save_file_name,message)
              ws.send('SYSTEMFile UPLOAD "'+adres+'"')
            }else{
              ws.send('Всё, ты уперся в ограничение места, больше нельзя заливать файлы')
              console.log(msize.size)
            }
          }else{
            if(msize.size < 1000000000){
              console.log(msize.size)
              jetpack.write(adres+'/'+ws.users.save_file_name,message)
              ws.send('SYSTEMFile UPLOAD "'+adres+'"')
            }else{
              ws.send('Всё, ты уперся в ограничение места, больше нельзя заливать файлы')
              console.log(msize.size)
            }
          }

      }else{
        if(message.toString().includes('SHUT_UP')){
          ws.users.aska_talks = true
        }else if(message.toString().includes('SPEECH')){
          ws.users.aska_talks = false
        }else if(message.toString().includes('aska_play_music_true')){
          ws.users.aska_play_music = true
        }else if(message.toString().includes('aska_play_music_false')){
          ws.users.aska_play_music = false
        }else if(message.toString().includes('LISTEN')){
          ws.users.attention = 'LISTEN'
          ws.users.nn_out_arr[3] = 'ASKA'
        }else if(message.toString().includes('FILE')){
          message = message.substring(4,message.length)
          //console.log(message)
          ws.users.save_file_name = message
        }else{
          //console.log(' ws.users.attention = '+ws.users.attention)
          if(ws.users.attention == 'LISTEN'){
            if(ws.users.input_Array[ws.users.input_Array.length-1] != message){
              ws.users.input_Array.push(message)
              ws.users.input_Array.splice(0,1)
            }
            console.log(ws.users.input_Array)
            set_to_run(ws,message.toString());
          }
        }
      }
    }catch(err){
      console.log(err)
      let err2 = err.toString()
      err2 = err2.substring(0,40)
      console.log(err2)
      ws.send('Внимание, Ошибка'+err2)
      if(ws.users.all_thoughts){
        ws.users.all_thoughts.forEach((v)=>{clearInterval(v)})
        clearInterval(ws.users.napomni)
        console.log('CLOSE CONNECTION')
        let err_arr = jetpack.read('./JSON/data/'+ws.users.name+'/err_arr.json','json')
        if(!err_arr){
         err_arr = ['пока не было ошибок']
        }
        err_arr.push(err2)
        jetpack.write('./JSON/data/'+ws.users.name+'/err_arr.json',err_arr)
        ws.close()
      }
    }});
  ws.addEventListener("close",()=>{
    if(ws.users.all_thoughts){
      ws.users.all_thoughts.forEach((v)=>{clearInterval(v)})
      clearInterval(ws.users.napomni)
      console.log('CLOSE CONNECTION')
    }
  });
});


///////////////////////////////////////////////////////////////////////
