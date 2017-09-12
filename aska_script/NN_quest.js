
const _ = require('underscore');
const brain = require('brain');
const jetpack = require('fs-jetpack');
const sendToAska = require('../main').sendToAska;
const this_real_time = require('./polival_kystu').this_real_time;
const circle = require('./circle');
///////////////////////////////////////////////////////////////////////////
//const trainFile = 'JSON/NNQ_Train.json';

const adrees = 'JSON/NNQ_ASKA.json';
const NN_train_buffer = 'NN_train_buffer.json';

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const calc_layers = function(aaa){
  var arr_p = jetpack.read(aaa,'json');
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
const real_time_to_014 = function(arr){
  let arr_new = [];
  arr_new.push((arr[0]-2000)/100)
  arr_new.push((arr[1]*(100/12))/100)
  arr_new.push((arr[2]*(100/31))/100)
  arr_new.push((arr[3]*(100/24))/100)
  arr_new.push((arr[4]*(100/60))/100)
  return arr_new;
}
/*
const NNQ_to_train = function(todo,ws){
  let arr = real_time_to_014(this_real_time());
  let obj = {
    "input": {
      "год": arr[0],
      "месяць": arr[1],
      "число": arr[2],
      "час": arr[3],
      "минут": arr[4]
    },
    "output": {
      [todo]: 1
    }
  }

  //sendToAska('SYSTEM'+JSON.stringify(obj),ws)
  let trainFileMain = './JSON/data/+'ws.x_user'+/NN_Train.json';
  let arr_train = jetpack.read(trainFile,'json')
  arr_train.push(obj)
  jetpack.write(trainFile,arr_train)
};
exports.NNQ_to_train = NNQ_to_train;
//////////////////////////////////////////////////////////////////////////////

const aska_give_quest = function(arr_time,ws){
  let trainFileMain = './JSON/NN_Train.json';
  const net = new brain.NeuralNetwork({
    hiddenLayers: calc_layers(trainFile) // global learning rate, useful when training using streams
  });
  let arr_aska = real_time_to_014(arr_time);

  let text = 'год месяць число час минут'
  net.fromJSON(jetpack.read(adrees,'json'));



  var yui = {};
  text.split(' ').map((v,index)=>{yui[v] = arr_aska[index]})
  //let code = `EVALconsole.log(${yui.toString()})`
  //sendToAska(code,ws)
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
    return (number[0]*10|0) > 0.1;
  });
  console.log(arr_x)
  const arrzet = Array.from(arr_x)
  let strx = ''
  arr_x.sort().reverse()
  arr_x.map(v=>strx += v[1]+' ')
  /////////////////////////////////////////////////////////////////////////////

  //let interval_01
 // clearInterval(interval_01)
  //let interval_02
 // clearInterval(interval_02)
  //let interval_03


  interval_01 = setInterval(()=>{
    if(windowManager.sharedData.fetch('SHUT_UP') == 'false'){
      clearInterval(interval_01)

      interval_02 = setInterval(()=>{
        if(windowManager.sharedData.fetch('SHUT_UP') == 'true'){
          clearInterval(interval_02)
          let interval_03;
          clearInterval(interval_03);
          interval_03 = setInterval(()=>{
            if(windowManager.sharedData.fetch('buffer_text').includes('хорошо')){
              clearInterval(interval_03)
              sendToAska('время пошло',ws)
              let arrs = [strx.split('_').join(' '),this_real_time()];
              jetpack.write('JSON/quest_ongoing.json',arrs);
              NNQ_to_train(strx,ws)
            }
          },1000)
        }
      },1000)
    }
  },1000)
  //////////////////////////////////////////////////////////////////////////
  return strx.split('_').join(' ')
}
exports.aska_give_quest = aska_give_quest;
*/
///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
/*
const aska_screen_quest = function(arr_time,type,ws){
  const net = new brain.NeuralNetwork({
    hiddenLayers: calc_layers(trainFile) // global learning rate, useful when training using streams
  });
  let arr_aska = real_time_to_014(arr_time);

  let text = 'год месяць число час минут'
  net.fromJSON(jetpack.read(adrees,'json'));



  var yui = {};
  text.split(' ').map((v,index)=>{yui[v] = arr_aska[index]})
  //let code = `EVALconsole.log(${yui.toString()})`
  //sendToAska(code,ws)
  var output = net.run(yui);
///////////////////////////////
  var arr_v = _.values(output)
  var arr_k = _.keys(output)
  var arr_x = []
  for(i=0;i<arr_v.length;i++){
    let arr_u = []
    arr_u.push(arr_v[i])
    arr_u.push(arr_k[i])
    arr_x[i] = arr_u
  }
  let arr_filter

  //for(i=0;i<arr_x.length-1;i++){
    arr_x.map((v,index)=>{if(v[1] == type){
     arr_filter = index;
    }})






  //////////////////////////////////////////////////////////////////////////
  //let zzz = arr_x.indexOf('поиграть_в_цивилизацию')
  return arr_x[arr_filter][0]
}
exports.aska_screen_quest = aska_screen_quest;
///////////////////////////////////////////////////////////////////////////
const aska_learn_quest = function(){
  const net = new brain.NeuralNetwork({
    hiddenLayers: calc_layers(trainFile) // global learning rate, useful when training using streams
  });

  var data = jetpack.read('JSON/NNQ_Train.json','json');
  net.train(data, {
    errorThresh: 0.005,  // error threshold to reach
    iterations: 50000,   // maximum training iterations
    log: false,           // console.log() progress periodically
    logPeriod: 10,       // number of iterations between logging
    learningRate: 0.3    // learning rate
  })
  var json_train = net.toJSON();
  jetpack.write(adrees,json_train)
  return 'обучение завершено'
}
exports.aska_learn_quest = aska_learn_quest;
////////////////////////////////////////////////////////////
*/
const aska_learn_delete = function(ws){
  let trainFileMain = './JSON/data/'+ws.users.name+'/NN_Train.json';
  var data = jetpack.read(trainFileMain,'json');
  let zzz = data[data.length-1]
  let zzzd = _.pairs(zzz.input)
  let zzzp = _.pairs(zzz.output)
  let zdd = []
  let zpp = []
  zzzd.forEach((v)=>{zdd.push(v[0])})
  zzzp.forEach((v)=>{zpp.push(v[0])})


  let kkk = zdd.join(' ')
  let kkk2 = zpp.join(' ')

  let n = 0
  let t = 0
  let k = 0
  let int_i00 = ws.users.all_thoughts.length
  ws.users.all_thoughts[int_i00] = setInterval(()=>{
    n++
    console.log(n)
    if(!ws.users.aska_talks){
      //console.log('первый этап')
      clearInterval(ws.users.all_thoughts[int_i00])
      ws.users.all_thoughts.splice(int_i00,1)

      let int_i01 = ws.users.all_thoughts.length
      ws.users.all_thoughts[int_i01] = setInterval(()=>{
        t++
        console.log('t'+t)
        if(ws.users.aska_talks){
          //console.log('второй этап')
          clearInterval(ws.users.all_thoughts[int_i01])
          ws.users.all_thoughts.splice(int_i01,1)


          let int_i02 = ws.users.all_thoughts.length
          ws.users.all_thoughts[int_i02] = setInterval(()=>{
            k ++
            console.log('k'+k)
            if(ws.users.input_Array[4] == 'подтверждаю'){
              //console.log('третий этап')
              clearInterval(ws.users.all_thoughts[int_i02])
              ws.users.all_thoughts.splice(int_i02,1)
              data.splice(data.length-1,1)
              jetpack.write(trainFileMain,data);
              ws.send('удаление произведено')
            }
            if(k > 15){
              clearInterval(ws.users.all_thoughts[int_i02])
              ws.users.all_thoughts.splice(int_i02,1)
              console.log(ws.users.all_thoughts)
            }
          },1000)
        }
        if(t > 15){
          clearInterval(ws.users.all_thoughts[int_i01])
          ws.users.all_thoughts.splice(int_i01,1)
          console.log(ws.users.all_thoughts)
        }
      },1000)
    }
  },1000)
  return 'К удалению предложена запись, '+kkk+'. С ответом, '+kkk2+'. Требуеться подтверждение'
}

const aska_learn_quest_main = function(ws){
  let first_time = this_real_time()
  let trainFileMain = './JSON/data/'+ws.users.name+'/NN_Train.json';
  let NN_train_buffer = './JSON/data/'+ws.users.name+'/NN_train_buffer.json';
  const net = new brain.NeuralNetwork({
    hiddenLayers: calc_layers(trainFileMain) // global learning rate, useful when training using streams
  });
  //jetpack.remove(NN_train_buffer);
  var data = jetpack.read(trainFileMain,'json');
  net.train(data, {
    errorThresh: 0.005,  // error threshold to reach
    iterations: 5000,   // maximum training iterations
    log: true,           // console.log() progress periodically
    logPeriod: 10,       // number of iterations between logging
    learningRate: 0.3    // learning rate
  })
  var json_train = net.toJSON();
  jetpack.write(NN_train_buffer,json_train)
  ws.users.attention = 'LISTEN'
  ws.send('EVALwindow.color_aska = 205;localStorage.pause_recog = true')
  ws.send('обучение завершено, '+circle.calc_math(first_time,'text'))
}
exports.aska_learn_quest_main = aska_learn_quest_main;
exports.aska_learn_delete = aska_learn_delete;
