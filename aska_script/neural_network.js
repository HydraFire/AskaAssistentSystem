
const _ = require('underscore');
const brain = require('brain');
const jetpack = require('fs-jetpack');
const windowManager = require('electron-window-manager');
const trainFile = './JSON/NN_Train.json';
const adrees = './JSON/NN_train_buffer.json';

const sendToAska = require('../main').sendToAska;
const commands = require('./commands').commands;

 const calc_layers = function(){
  var arr_p = jetpack.read(trainFile,'json');
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

const net = new brain.NeuralNetwork({
  hiddenLayers: calc_layers() // global learning rate, useful when training using streams
});

const set_to_run = function(text,ws){
  net.fromJSON(jetpack.read(adrees,'json'));
  windowManager.sharedData.set('buffer_text', text);


  var yui = {};
  text.split(' ').map(v=>yui[v] = 1)
  
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
    return (number[0]*10|0) > 1;
  });
  console.log(arr_x)
  const arrzet = Array.from(arr_x)
  let strx = ''
  arr_x.sort().reverse()
  arr_x.map(v=>strx += v[1]+' ')
  /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  strx = commands(strx,ws)
  sendToAska(strx,ws)
};
exports.set_to_run = set_to_run;
exports.calc_layers = calc_layers;