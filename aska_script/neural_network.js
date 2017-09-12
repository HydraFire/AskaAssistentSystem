
const _ = require('underscore');
const brain = require('brain');
const jetpack = require('fs-jetpack');
//const windowManager = require('electron-window-manager');
//const trainFile = './JSON/NN_Train.json';


const sendToAska = require('../main').sendToAska;
const commands = require('./commands').commands;
const memory_fun = require('./memory_fun');
const NNQ = require('./NN_quest');


const calc_layers = function(ws,way){
  var arr_p = jetpack.read(way,'json');
  // console.log(arr_p)
  if(!arr_p){
    console.log('WOW')
    jetpack.copy('./public/NN_Train.json', './JSON/data/'+ws.users.name+'/NN_Train.json', { overwrite: true });
    jetpack.copy('./public/NN_train_buffer.json', './JSON/data/'+ws.users.name+'/NN_train_buffer.json', { overwrite: true });
    arr_p = jetpack.read(way,'json');
  }

  var tyu = _.pairs(arr_p)
  var l_input = 0
  var l_output = 0
  for(i=0;i<arr_p.length;i++){
    let y = arr_p[i].input
    let x = arr_p[i].output
    l_input += _.pairs(y).length
    l_output += _.pairs(x).length
  }
  return [l_input,(l_input+l_output),l_output]
};




const set_to_run = function(ws,text){
  console.log('NN')
  console.log(ws.users.name)
  console.log('NN')
  let net = new brain.NeuralNetwork({
    hiddenLayers: calc_layers(ws,'./JSON/data/'+ws.users.name+'/NN_Train.json') // global learning rate, useful when training using streams
  });
  console.log('NEXT')
  let net_render = jetpack.read('./JSON/data/'+ws.users.name+'/NN_train_buffer.json','json')
  if(!net_render){
    jetpack.copy('./public/NN_train_buffer.json', './JSON/data/'+ws.users.name+'/NN_train_buffer.json', { overwrite: true });
    net_render = jetpack.read('./JSON/data/'+ws.users.name+'/NN_train_buffer.json','json')  
  }
  net.fromJSON(net_render);
  console.log('nn_connect')
  //windowManager.sharedData.set('buffer_text', text);


  var yui = {};
  text.split(' ').map((v,i)=>{yui[v] = (99-i)/100})
  console.log(yui)
  var output = net.run(yui);

  var arr_v = _.values(output)
  var arr_k = _.keys(output)
  var arr_x = []
  for(i=0;i<arr_v.length;i++){
    let arr_u = []
    arr_u.push(arr_v[i])
    arr_u.push(arr_k[i])
    arr_x[i] = arr_u
  }

  arr_x.sort().reverse()

  arr_x = arr_x.filter(function(number) {
    return (number[0]*10|0) > 4;
  });
  console.log(arr_x)
  const arrzet = Array.from(arr_x)
  let strx = ''
  arr_x.sort().reverse()
  arr_x.map(v=>strx += v[1]+' ')
  /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  strx == 'я '? strx = '':'';
  let zex = ws.users.nn_out_arr
  zex.push(strx)
  zex.splice(0,1)
  ws.users.nn_out_arr = zex

  if(ws.users.all_thoughts.length == 0 && ws.users.nn_out_arr[0]==''&&ws.users.nn_out_arr[1]==''&&ws.users.nn_out_arr[2]==''&&ws.users.nn_out_arr[3]==''){
    ws.users.attention = 'NO LISTEN'
    ws.send('EVALwindow.color_aska = 20;aska("режим ожидания")')
  }
  console.log(ws.users.nn_out_arr)

  //strx = commands(strx,ws)

  if(ws.users.silence){
    strx = '_mute_'
  }
  if(ws.users.input_Array[4].includes('режим команд')){
    ws.users.nn = false
  }
  if(ws.users.input_Array[4] == 'запомни' ||
    ws.users.input_Array[4] == 'напомни' ||
    ws.users.input_Array[4] == 'запомнить'){
    let ask = ws.users.input_Array[2]
    let answer = ws.users.input_Array[3]
    if(ask == ' ' || answer == ' '){
      strx = 'я немогу запомнить пустую информацию'
    }else{
      strx = memory_fun.save(ask,answer,ws)
    }
    //ws.send(strx)
    //strx = ''
  }
  if(ws.users.input_Array[4] == 'обучение'){
    ws.users.attention = 'NO LISTEN'
    ws.send('EVALwindow.color_aska = 20;aska("обучение может занять несколько менут");localStorage.pause_recog = true')
    //ws.send('Инициализована процедура переобучения нейроной сети, может занять несколько минут')
    setTimeout(()=>{
     NNQ.aska_learn_quest_main(ws)
     strx = ''
    },200)
    
    //ws.send(strx)
  }


  sendToAska(strx,ws)
};
exports.set_to_run = set_to_run;
exports.calc_layers = calc_layers;