
const electron = require('electron');
//const jetpack = require('fs-jetpack');
const app = electron.app;  // Module to control application life.
app.on('window-all-closed', () => {
  console.log('не закрывает сервер после закрытия окна')
})
const BrowserWindow = electron.BrowserWindow;
const jetpack = require('fs-jetpack');
const windowManager = require('electron-window-manager');
//Обявление Mesengera //////////////////////////////////////////
const sendToAska = function (message,ws){
  ws.send(message)
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
    express = require("express"),
    http = require("http"),
    exp = express(),
    server = http.createServer(exp);

exp.use(express.static(__dirname + '/public'));
server.listen(8080);

function somebodyConnected_log(ws,id,message){
  let message2 = 'SYSTEM';
  message2 += JSON.stringify(id)+'  '+message;
  ws.send(message2)
}

var wss = new WebSocketServer({server: server});
wss.on("connection", function(ws){
  ws.on('message', function(message,id) {
    let data = message.toString()
    if(data.substring(0,4) == 'USER'){
     message = message.toString().substring(4,message.length);
     let arr_ip_id = [
     ['HydraFire','159.224.183.122'],
     ['HydraFire','159.224.183.122'],
     ['HydraFire','46.30.41.26']
     ]
     arr_ip_id.some(v=>{
       if(v[1] == message){ return message = v[0]}else{message = message}
     })
     ws['x_user'] = message;
     somebodyConnected(ws)
     windowManager.sharedData.set('playing_music','none');
    }
    somebodyConnected_log(ws,id,message)
    
    
    if(message.toString().includes('SHUT_UP')){
      windowManager.sharedData.set('SHUT_UP','true');
    }else if(message.toString().includes('SPEECH')){
      windowManager.sharedData.set('SHUT_UP','false');
    }else{
      set_to_run(message.toString(),ws);
    }
    
  });
});
///////////////////////////////////////////////////////////////////////
app.on('ready', () => {
  console.log('server start')
  ////////////////////////////////////////////////////////////////////////  
})
