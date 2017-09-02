
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
const text_analitic = require('./aska_script/text_analitic');
//Подключение функции работаюшей с нейросетью ////////////////////
const set_to_run = require('./aska_script/neural_network').set_to_run;
const commands = require('./aska_script/commands');
//global.attention = 'LISTEN'
//////////////////////////////////////////////////////////////////
//// WebSocketServer ///////////////////////////////////////////////
const WebSocketServer = require("ws").Server
const https = require("https")
const http = require("http")
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
var server2 = http.createServer(exp).listen(80);
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

    let login_data = jetpack.read('./JSON/data/auto_login.json','json')
    registration.login(ws,login_data[0])
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
            if(ws.users.nn == true){
              console.log('нейроная сеть')
              set_to_run(ws,message.toString());
            }else{
              console.log('режим команд')
              console.log(ws.users.all_thoughts.length)
              if(ws.users.all_thoughts.length == 0){
                let arr_des = []
                let desigen = message.toString()
                console.log(desigen)
                if(desigen.includes('найди трек')||
                   desigen.includes('включи этот трек')||
                   desigen.includes('найти трек')){
                  commands.run(desigen,ws)
                }else if(desigen[0] == 'я'){
                  commands.run(desigen,ws)
                }else if(desigen[0] == 'к'&&
                         desigen[1] == 'о'&&
                         desigen[2] == 'г'&&
                         desigen[3] == 'д'&&
                         desigen[4] == 'а'&&
                         desigen[5] == ' '&&
                         desigen[6] == 'я'){
                  commands.run(desigen,ws)
                }else if(desigen.includes('то же самое что и')){
                  text_analitic.plus_command(ws,'то же самое что и',desigen)
                }else if(desigen.includes('тоже самое что и')){
                  text_analitic.plus_command(ws,'тоже самое что и',desigen)
                }else if(desigen.includes('тоже самое что')){
                  text_analitic.plus_command(ws,'тоже самое что',desigen)
                }else{
                  let arr_commands = jetpack.list('./JSON/data/'+ws.users.name+'/commands')
                  arr_commands.forEach((v,i)=>{
                    let m = arr_commands[i]
                    m = m.substring(0,m.length-5)
                    arr_commands[i] = m
                  })
                  desigen = desigen.split(' ').join('_')
                  console.log('arr_des  '+arr_commands)
                  arr_commands.forEach((v,i)=>{
                    arr_des.push([text_analitic.go(desigen,v),v])
                  })
                  
                  arr_des.sort(function (a, b) {
                    if (a[0] > b[0]) {
                      return 1;
                    }
                    if (a[0] < b[0]) {
                      return -1;
                    }
                    // a должно быть равным b
                    return 0;
                  })
                  //arr_des.reverse()
                  console.log('arr_des  '+arr_des)
                  if(arr_des[arr_des.length-1][0]>99){
                    desigen = arr_des[arr_des.length-1][1]
                    let origin = jetpack.read('./JSON/data/'+ws.users.name+'/commands/'+desigen+'.json','json')

                    if(origin[0] == 'true'){
                      desigen = desigen.split('_').join(' ')
                      console.log(desigen)
                      commands.run(desigen,ws)
                    }else{
                      let xc = origin[0]
                      xc = xc.split(' ').join('_')
                      let rrr = jetpack.read('./JSON/data/'+ws.users.name+'/commands/'+xc+'.json','json')
                      if(rrr[0]=='true'){
                        console.log(desigen)
                        desigen = origin[0]
                        desigen = desigen.split('_').join(' ')
                        console.log(desigen)
                        commands.run(desigen,ws)
                      }
                    }
                  }else if(arr_des[arr_des.length-1][0]>50){
                    let k = arr_des[arr_des.length-1][1]
                    k = k.split('_').join(' ')
                    ws.send('очень похоже на команду '+k)
                    k = k.split(' ').join('_')
                    text_analitic.ask(ws,desigen,k)
                  }

                }
              }
            }
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
        clearInterval(ws.users.zet)
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
      clearInterval(ws.users.zet)
      console.log('CLOSE CONNECTION')
    }
  });
});


///////////////////////////////////////////////////////////////////////
