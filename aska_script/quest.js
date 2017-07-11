
const jetpack = require('fs-jetpack');
const sendToAska = require('../main').sendToAska;
const this_real_time = require('./polival_kystu').this_real_time;
const calc_time = require('./polival_kystu').calc_time;
//const NNQ = require('./NN_quest');
const polival_kystu = require('./polival_kystu');

const question = function(ask,answer,effects,ws){
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      sendToAska(ask,ws)
      let iid = setInterval(()=>{
        if(answer == jetpack.read('buffer_text.json','.txt')){
          resolve(effects);
          clearInterval(iid);
        }
      },500)

      }, 5000);
  });


  promise.then(
    result => {
      // let arr = jetpack.read('buffer.json','.txt')
      let arrx = jetpack.read('./JSON/todo.json','json');
      let arrv = result.split(',')

      arrx.forEach((v,i)=>{
        if(v == arrv[0]){
          arrx.splice(i,1)
          jetpack.write('./JSON/todo.json',arrx);
        }
      })
      //debug('градусов тепла')
      setTimeout(() => {
        sendToAska(effects,ws)
      }, 200);
    },
    error => {
      console.log("Rejected: " + error);
    }
  );
}                           
exports.question = question;
////////////////////////////////////////////////////////////////////
const reposition_up = function(answer,effects,onswer,ws){

  function per(a,i,vector){
    let y = a.splice(i,1)
    if(vector != 0){
      a.splice(i+vector,0,y[0])
    }       
    jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',a);
  }



  console.log('interval START')
  let n = 0
  let int_00 = ws.users.all_thoughts.length
  ws.users.all_thoughts[int_00] = setInterval(()=>{
    n++
    console.log(n)

    answer.forEach((v,index)=>{
      if(ws.users.input_Array[4] == v){
        let x_x
        try{
          sendToAska('All is OK',ws);
          x_x = true
        }catch(err){
          x_x = false
          console.log(err)
        }
        if(x_x){

          let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json');
          arrx.forEach((m,i)=>{
            if(m == effects){
              if(index == 0){
                per(arrx,i,-1)
                sendToAska(onswer[index],ws)
                clearInterval(ws.users.all_thoughts[int_00])
                ws.users.all_thoughts.splice(int_00,1)
                console.log('interval close')
              }
              if(index == 1){
                per(arrx,i,+1)
                sendToAska(onswer[index],ws)
                clearInterval(ws.users.all_thoughts[int_00])
                ws.users.all_thoughts.splice(int_00,1)
                console.log('interval close')
              }
              if(index == 2){
                sendToAska(onswer[index],ws)
                start_quest(ws,i)
                clearInterval(ws.users.all_thoughts[int_00])
                ws.users.all_thoughts.splice(int_00,1)
                console.log('interval close')
              }
              if(index == 3){
                per(arrx,i,0)
                sendToAska(onswer[index],ws)
                clearInterval(ws.users.all_thoughts[int_00])
                ws.users.all_thoughts.splice(int_00,1)
                console.log('interval close')
              }
            }
          })
        }
      }
    })
    if(n>60){  
      clearInterval(ws.users.all_thoughts[int_00])
      ws.users.all_thoughts.splice(int_00,1)
      console.log('interval close')
    }
  },1000)
}                           
exports.question = question;
/////////////////////////////////////////////////////////////////////////////
const add_quest = function(ws){
  let text = ws.users.input_Array[4];
  let n = 0
  console.log('begin interval')
  let int_00 = ws.users.all_thoughts.length
  ws.users.all_thoughts[int_00]  = setInterval(()=>{
    n++
    console.log(n)

    if(text != ws.users.input_Array[4]){
      let x_x
      try{
        sendToAska(ws.users.input_Array[4]+'. Добавила в список заданий',ws);
        x_x = true
      }catch(err){
        x_x = false
        console.log(err)
      }
      if(x_x){
        let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json');
        if(!arrx){
          arrx = [
            "проверка всех систем"
          ]
          jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arrx);
        }
        arrx.push(ws.users.input_Array[4])
        jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arrx);
        clearInterval(ws.users.all_thoughts[int_00])
        ws.users.all_thoughts.splice(int_00,1)
        console.log('interval close')
      }}
    if(n>60){
      clearInterval(ws.users.all_thoughts[int_00])
      ws.users.all_thoughts.splice(int_00,1)
      console.log('interval close')
    }
  },1000)
  return 'записываю';
}
exports.add_quest = add_quest;

const list_quest = function(effects,ws){
  let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json');
  if(!arrx){
    return 'Список заданий еще не создан, создай первую запись.Просто скажи, новое задание'
  }
  console.log('interval START')
  let n = 0
  let int_id = ws.users.all_thoughts.length
  ws.users.all_thoughts[int_id] = setInterval(()=>{
    n++
    console.log(n)
    let answer = jetpack.read('JSON/data/'+ws.users.name+'/todo.json','json');
    answer.forEach((v,i)=>{
      if(ws.users.input_Array[4] == v){

        setTimeout(() => {
          sendToAska('ты выбрал '+i+'-тую строчку в списке',ws)
          let commands = ["переместить вверх","переместить вниз","выбрать","удалить"];
          let onsver_com = ["переместила ближе","переместила дальше","время пошло","задание удалено"]
          reposition_up(commands,v,onsver_com,ws)
          /*
          setTimeout(() => {
            sendToAska(effects,ws)

          }, 2200);
          */
        },200);
        clearInterval(ws.users.all_thoughts[int_id])
        ws.users.all_thoughts.splice(int_id,1)
      }
    })

    // },500)
    if(n>30){  
      clearInterval(ws.users.all_thoughts[int_id])
      ws.users.all_thoughts.splice(int_id,1)
      console.log('interval close')
    }
  }, 1000);
  ws.send('SYSTEM '+arrx.join(' ,'))
  return arrx.join(' ,');
}
exports.list_quest = list_quest;

const finished_quest = function(ws){
  let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/quest_finished.json','json').join(' ,');
  console.log('create new file quest_finished.json')
  return arrx;
}
exports.finished_quest = finished_quest;

const start_quest = function(ws,one){
  //console.log('YRA')
  let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json');
  //console.log(arrx)
  if(!one){
    one = arrx.length-1
  }
  let arrs = [arrx[one],this_real_time()];
  //NNQ.NNQ_to_train(arrx[one].split(' ').join('_'),ws)
  jetpack.write('./JSON/data/'+ws.users.name+'/quest_ongoing.json',arrs);

  return 'я выбрала задание, '+arrx[one];
  ////////////////////////////////////////////////////////////////////
}
exports.start_quest = start_quest;

const finish_quest = function(ws){
  let arrf = jetpack.read('./JSON/data/'+ws.users.name+'/quest_ongoing.json','json');
  if(arrf[0] != 'none'){
    let arrrx = ['none']
    jetpack.write('./JSON/data/'+ws.users.name+'/quest_ongoing.json',arrrx);

    let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json')
    let index = arrx.indexOf(arrf[0]);
    arrx.splice(index,1)
    jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arrx);
    //NNQ.NNQ_to_train(arrf[0],ws)
 
    let aaa = jetpack.read('./JSON/data/'+ws.users.name+'/quest_finished.json','json');
    if(!aaa){
      aaa = [
        [
          "открыл этот сайт",
          " , ,  1 секунда"
        ]
      ]
    }
    let timer = calc_time(arrf[1]);
    aaa.push([arrf[0],timer]);
    jetpack.write('./JSON/data/'+ws.users.name+'/quest_finished.json',aaa);
    return 'выполнено задание '+arrf[0]+', на него ушло '+timer;
  }else{
    return 'я недавала пока некаких заданий';
  }
}
exports.finish_quest = finish_quest;

const ongoing = function(ws){
  let arr_ongoing = jetpack.read('./JSON/data/'+ws.users.name+'/quest_ongoing.json','json');
  if(!arr_ongoing){
    arr_ongoing = [
      "розпросить о других функциях",
      [
        2017,
        6,
        16,
        10,
        15
      ]
    ]
    console.log('create new file arr_ongoing.json')
  }
  if(arr_ongoing[0] != 'none'){
    let timer = calc_time(arr_ongoing[1]);
    return 'сейчас идет задание '+arr_ongoing[0]+', уже как '+timer;
  }else{
    return 'я недавала пока некаких заданий';
  }
}
exports.ongoing = ongoing;
/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//
//
//
const made_yesterday = function(adres,ws){
  let arr_made = jetpack.read('./JSON/data/'+ws.users.name+'/'+adres,'json')
  if(!arr_made){
    arr_made = [
      [
        "написала тебе интересную функцию",
        "но очень мало поела",
        "всё"
      ]
    ]
  }
  let arr_x = arr_made[arr_made.length-1].join(' , ')
  arr_x = ', ты ответил ,' + arr_x
  return arr_x;
}
exports.made_yesterday = made_yesterday;
/////////////////////////////////////////////////////////////////////
const remind = function(answer,adres,ws){
  ws.users.int_end = 'START'
  console.log('REC')
  ws.users.silence = true
  //console.log('HERE <---------------')
  let dreems = jetpack.read('./JSON/data/'+ws.users.name+'/'+adres,'json')

  if(!dreems){
    dreems = [
      [
        "написала тебе интересную функцию",
        "но очень мало поела",
        "всё"
      ]
    ]
  }
  let buffer_interval = ws.users.input_Array[4];
  let arr_interval = []
  let n = 0
  let int_id = ws.users.all_thoughts.length
  ws.users.all_thoughts[int_id] = setInterval(()=>{
    n++
    console.log(n)
    if(buffer_interval != ws.users.input_Array[4]){
      buffer_interval = ws.users.input_Array[4];
      arr_interval.push(buffer_interval)
      console.log(n+' global[ws.x_user] = '+ws.users.input_Array[4]+' answer = '+answer)
      if(ws.users.input_Array[4] == answer){  
        ws.send('я всё окуратно записала')
        console.log('я всё окуратно записала')
        dreems.push(arr_interval)

        //sendToAska('SYSTEM '+JSON.stringify(arr_interval),ws)
        ws.users.int_end = 'END';
        jetpack.write('./JSON/data/'+ws.users.name+'/'+adres,dreems);
        clearInterval(ws.users.all_thoughts[int_id]);
        ws.users.all_thoughts.splice(int_id,1)
        console.log('silence false')
        ws.users.silence = false;

      }
    }
    if(n>600){
      clearInterval(ws.users.all_thoughts[int_id])
      ws.users.all_thoughts.splice(int_id,1)
      console.log('Interval Close')
    }
  },1000)




}
exports.remind = remind;
/*
const dreamsCome_true = function(answer,ws){
    let dreems = jetpack.read('./JSON/dreamsCome_true.json','json')
    let buffer_interval = global[ws.x_user]
    let arr_interval = []

    let iid = setInterval(()=>{
      if(buffer_interval != global[ws.x_user]){
        buffer_interval = global[ws.x_user];
        arr_interval.push(buffer_interval)
        if(global[ws.x_user] == answer){  
          dreems.push(arr_interval)
          jetpack.write('./JSON/dreamsCome_true.json',dreems)
          sendToAska('SYSTEM '+JSON.stringify(arr_interval),ws)
          clearInterval(iid);
          global.inter03 = 'END'
        }
      }
    },500)
}
exports.dreamsCome_true = dreamsCome_true;
*/
///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


//
/////////////////////////////////////////////////////////////////////
///////////////////// Разработка новых возможностей /////////////////
/////////////////////////////////////////////////////////////////////
const listener_of_end = function(arr_command,ws){
  let n = 0
  let t = 0
  let k = 0
  let int_id00 = ws.users.all_thoughts.length

  ws.users.all_thoughts[int_id00] = setInterval(()=>{
    n++
    console.log(n)
    if(!ws.users.aska_talks){
      clearInterval(ws.users.all_thoughts[int_id00])
      ws.users.all_thoughts.splice(int_id00,1)

      let int_id01 = ws.users.all_thoughts.length
      ws.users.all_thoughts[int_id01] = setInterval(()=>{
        t++
        console.log(t)
        if(ws.users.aska_talks){
          console.log('YOU HERE <----------------')
          clearInterval(ws.users.all_thoughts[int_id01])
          ws.users.all_thoughts.splice(int_id01,1)

          if(arr_command.length > 1){
            if(arr_command[0].includes('а что интересного было вчера')){
              remind('всё','Dreams.json',ws)

              let int_id02 = ws.users.all_thoughts.length
              console.log(int_id02)
              ws.users.all_thoughts[int_id02] = setInterval(()=>{
                k++
                if(ws.users.int_end == 'END'){
                  clearInterval(ws.users.all_thoughts[int_id02-1])
                  console.log(int_id02)
                  ws.users.all_thoughts.splice(int_id02-1,1)
                  let arr_re = Array.from(arr_command)
                  arr_re.splice(0,1)
                  console.log('ZDESSSS')
                  console.log(ws.users.all_thoughts)
                  let text1 = listener_of_end(arr_re,ws)
                  try{
                    sendToAska(text1,ws)
                  }catch(err){
                    console.log(err)
                  }
                }
                if(k>1000){
                  console.log('clear interval_03')
                  clearInterval(ws.users.all_thoughts[int_id02])
                  ws.users.all_thoughts.splice(int_id02,1)
                }
              },500)
            }else if(arr_command[0].includes('что собираешься делать сегодня')){
              remind('всё','dreamsCome_true.json',ws)

              let int_id02 = ws.users.all_thoughts.length
              ws.users.all_thoughts[int_id02] = setInterval(()=>{
                k++
                if(ws.users.int_end == 'END'){
                  clearInterval(ws.users.all_thoughts[int_id02-1])
                  ws.users.all_thoughts.splice(int_id02-1,1)
                  let arr_re = Array.from(arr_command)
                  arr_re.splice(0,1)
                  //console.log('ZDESSSS')
                  console.log(ws.users.all_thoughts)
                  let text1 = listener_of_end(arr_re,ws)
                  try{
                    sendToAska(text1,ws)
                  }catch(err){
                    console.log(err)
                  }
                }
                if(k>100){
                  console.log('clear interval_03')
                  clearInterval(ws.users.all_thoughts[int_id02-1])
                  ws.users.all_thoughts.splice(int_id02-1,1)
                }
              },500)
            }else{
              let arr_re = Array.from(arr_command)
              arr_re.splice(0,1)
              let text1 = listener_of_end(arr_re,ws)
              try{
                sendToAska(text1,ws)
              }catch(err){
                console.log(err)
              }
            }

          }
        }
        if(t>100){
          clearInterval(ws.users.all_thoughts[int_id01])
          ws.users.all_thoughts.splice(int_id01,1)
          console.log('Interval Close')
        }
      },500)
    }
    if(n>100){
      clearInterval(ws.users.all_thoughts[int_id00])
      ws.users.all_thoughts.splice(int_id00,1)
      console.log('Interval Close')
    }
  },500)

  let xx 
  if(arr_command[0].includes('wanted_yesterday()')){
    xx = made_yesterday('dreamsCome_true.json',ws);
  }else if(arr_command[0].includes('made_yesterday()')){
    xx = made_yesterday('Dreams.json',ws);
  }else if(arr_command[0].includes('()')){
    xx = '';
  }else{
    xx = arr_command[0];
  };
  return xx;
}
exports.listener_of_end = listener_of_end;