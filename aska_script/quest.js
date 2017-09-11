
const jetpack = require('fs-jetpack');
const sendToAska = require('../main').sendToAska;
const this_real_time = require('./polival_kystu').this_real_time;
const calc_time = require('./polival_kystu').calc_time;
//const NNQ = require('./NN_quest');
const polival_kystu = require('./polival_kystu');
const quest_data_base_4D = require('./quest_data_base_4D');

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
/*
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

          let arrx = answer
          arrx.forEach((m,i)=>{
            if(ws.users.input_Array[4] == m){
              if(m == 'переместить вверх'){
                // per(arrx,i,-1)
                sendToAska(onswer[index],ws)
                clearInterval(ws.users.all_thoughts[int_00])
                ws.users.all_thoughts.splice(int_00,1)
                console.log('interval close')
              }else
                if(m == "переместить вниз"){
                  per(arrx,i,+1)
                  sendToAska(onswer[index],ws)
                  clearInterval(ws.users.all_thoughts[int_00])
                  ws.users.all_thoughts.splice(int_00,1)
                  console.log('interval close')
                }else
                  if(m == 'выбрать'){
                    sendToAska(onswer[index],ws)
                    ws.send(start_quest(ws,i))
                    clearInterval(ws.users.all_thoughts[int_00])
                    ws.users.all_thoughts.splice(int_00,1)
                    console.log('interval close')
                  }else 
                    if(m == "удалить"){
                      //per(arrx,i,0)
                      sendToAska(onswer[index],ws)
                      clearInterval(ws.users.all_thoughts[int_00])
                      ws.users.all_thoughts.splice(int_00,1)
                      console.log('interval close')
                    }else
                      if(m == "новое задание"){
                        ws.send(add_quest(ws,'список заданий',effects))
                        clearInterval(ws.users.all_thoughts[int_00])
                        ws.users.all_thoughts.splice(int_00,1)
                        console.log('interval close')
                      }else
                        if(m == "отмена"){
                          ws.send('очень жаль')
                          clearInterval(ws.users.all_thoughts[int_00])
                          ws.users.all_thoughts.splice(int_00,1)
                          console.log('interval close')
                        }else{
                          let arr_z = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json');
                          arr_z = quest_data_base_4D.get_list(effects,m,arr_z)
                          console.log(arr_z)
                          sendToAska('тест '+arr_z,ws)
                          clearInterval(ws.users.all_thoughts[int_00])
                          ws.users.all_thoughts.splice(int_00,1)
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
*/
/////////////////////////////////////////////////////////////////////////////
const add_quest = function(ws,a,b){
  let text = ws.users.input_Array[4];
  let n = 0
  console.log('begin interval')
  let int_00 = ws.users.all_thoughts.length
  console.log(int_00)
  ws.users.all_thoughts[int_00] = setInterval(()=>{
    n++
    console.log(n)
    console.log(ws.users.all_thoughts[int_00])
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
          arrx = [['345678','список заданий','false','time'],
                  ['785698','здоровье','false','time'],
                  ['345678','пропить курс таблеток','false','time'],
                  ['245648','сходить к врачу','false','time'],
                  ['165322','прочесть книгу','false','time'],
                  ['826772','найти сайт с выбором книг который бы понравился','false','time'],
                  ['455789','найти достойную книгу','false','time'],
                  ['545678','скачать','false','time']]
          jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arrx);
        }
        arrx = quest_data_base_4D.create_node(arrx,a,b,ws.users.input_Array[4])
        jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arrx);
        clearInterval(ws.users.all_thoughts[0])
        console.log(ws.users.all_thoughts.length)
        ws.users.all_thoughts.splice(0,1)
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
const add_list_quest = function(ws,arr,a,b){
  ws.users.input_Array[4] = 'none'
  let n = 0
  let t = 0
  let k = 0
  let int_id00 = ws.users.all_thoughts.length
  ws.send('на маленькие кусочьки')
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
          let int_id02 = ws.users.all_thoughts.length
          console.log(int_id02)
          ws.users.all_thoughts[int_id02] = setInterval(()=>{
            k++
            console.log(k)
            if(ws.users.input_Array[4] == 'всё'){
              clearInterval(ws.users.all_thoughts[int_id02])
              console.log(int_id02)
              ws.users.all_thoughts.splice(int_id02,1)
              ws.send('отличьно, уже пол дела')
            }else{
              let c = ws.users.input_Array[4]
              if(c!='none'){
                arr = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json')
                arr = quest_data_base_4D.create_node(arr,a,b,c)
                jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arr)
                ws.users.input_Array[4] = 'none'
              }
            }
            if(k>2000){
              console.log('clear interval_03')
              clearInterval(ws.users.all_thoughts[int_id02])
              ws.users.all_thoughts.splice(int_id02,1)
            }
          },500)

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
  return arr
}
const list_quest = function(a,b,arr,ws){
  ws.users.new_par = false
  if(!arr){
    return 'Список заданий еще не создан, создай первую запись.Просто скажи, новое задание'
  }
  let answer = quest_data_base_4D.get_list(a,b,arr)
  ws.send('SYSTEM '+answer.join(' ,'))
  if(answer.length<1){
    ws.send('выбрала '+b)
  }else{
    //ws.send('это задание состоит из, '+answer)
    ws.send(', '+answer)
  }
  answer.push('новое задание')
  answer.push('отмена')
  answer.push('удалить')
  answer.push('начать')
  answer.push('поделить на части')

  let n = 0
  let int_id = ws.users.all_thoughts.length
  ws.users.all_thoughts[int_id] = setInterval(()=>{
    n++
    console.log(n)


    answer.forEach((v,i)=>{
      //console.log('ws.users.input_Array[4]='+ws.users.input_Array[4]+'   v='+v)
      if(ws.users.input_Array[4] == v){
        console.log(ws.users.input_Array[4])
        if(v == 'новое задание'){
          console.log(ws.users.all_thoughts[int_id])
          console.log(ws.users.all_thoughts.length+' <----------')
          clearInterval(ws.users.all_thoughts[int_id])
          ws.users.all_thoughts.splice(int_id,1)
          ws.send(add_quest(ws,a,b))

        }else if(v == 'начать'){
          //ws.users.new_par = true
          //ws.send('ладно')
          clearInterval(ws.users.all_thoughts[int_id])
          ws.users.all_thoughts.splice(int_id,1)

         
          ws.users.quest_buffer_a = a
          ws.users.quest_buffer_b = b
          console.log('A='+a+' B= '+b)
          start_quest(ws,a,b)
          
        }else if(v == 'поделить на части'){

          //ws.users.new_par = true
          clearInterval(ws.users.all_thoughts[int_id])
          ws.users.all_thoughts.splice(int_id,1)
          arr = add_list_quest(ws,arr,a,b)
          jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arr)
        }else if(v == 'удалить'){

          clearInterval(ws.users.all_thoughts[int_id])
          ws.users.all_thoughts.splice(int_id,1)
          //ws.users.new_par = true
          console.log('B= '+b)
          console.log('ws.users.input_Array[3]= '+ws.users.input_Array[3])
          ws.send('удалено задание '+ws.users.input_Array[3])
          arr = quest_data_base_4D.delete_node(arr,a,b,ws)
          jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arr)

        }else if(v == 'отмена'){

          //ws.users.new_par = true
          ws.send('ладно')
          clearInterval(ws.users.all_thoughts[int_id])
          ws.users.all_thoughts.splice(int_id,1)
        }else{
          clearInterval(ws.users.all_thoughts[int_id])
          ws.users.all_thoughts.splice(int_id,1)

          // answer = quest_data_base_4D.get_list(b,v,arr)


          console.log('interval START')
          console.log('A= '+a+' B='+b)
          console.log('B= '+b+' C='+v)
          list_quest(b,v,arr,ws)

        }

      }
    })

    // },500)
    if(n>180){  
      clearInterval(ws.users.all_thoughts[int_id])
      ws.users.all_thoughts.splice(int_id,1)
      console.log('interval close')
    }
  }, 1000);

  //return answer.join(' ,');
}
exports.list_quest = list_quest;

const finished_quest = function(ws){
  let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/quest_finished.json','json').join(' ,');
  console.log('create new file quest_finished.json')
  return arrx;
}
exports.finished_quest = finished_quest;

const start_quest = function(ws,b,c){
  //console.log('YRA')
  let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json');
  //console.log(arrx)
  //let test = quest_data_base_4D.get_list(b,c,arrx)
  // if(test.length>1){
  c = quest_data_base_4D.start_node(arrx,b,c,ws)
  // }else{
  //  с = quest_data_base_4D.search_i(arrx,с)
  // c = arrx[с]
  // }

  //let arrs = [arrx[one],this_real_time()];

  //jetpack.write('./JSON/data/'+ws.users.name+'/quest_ongoing.json',arrs);

  return 'давай начьнем с, '+c;
  ////////////////////////////////////////////////////////////////////
}
exports.start_quest = start_quest;

const finish_quest = function(ws){
  let arrf = jetpack.read('./JSON/data/'+ws.users.name+'/quest_ongoing.json','json');
  if(arrf[0] != 'none'){
    let arrrx = ['none']
    jetpack.write('./JSON/data/'+ws.users.name+'/quest_ongoing.json',arrrx);
    let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json')
    arrx = quest_data_base_4D.delete_node(arrx,arrf[0],arrf[1],ws)
    jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arrx);
    let timer = calc_time(arrf[2]);
    ws.send('выполнено задание '+arrf[1]+', на него ушло '+timer)
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
            clearInterval(ws.users.all_thoughts[int_id01])
            ws.users.all_thoughts.splice(int_id01,1)
            if(arrf[4] == arrf[1]){
            ws.send('Поздравляю, комплексное задание '+arrf[1]+',выполнено')
            }else{
            start_quest(ws,arrf[3],arrf[4])
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
  }else{
    ws.send('я недавала пока некаких заданий')
  }
}
exports.finish_quest = finish_quest;

const ongoing = function(ws){
  let arr_ongoing = jetpack.read('./JSON/data/'+ws.users.name+'/quest_ongoing.json','json');
  if(!arr_ongoing){
    arr_ongoing = [
      "cписок заданий",
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
    let timer = calc_time(arr_ongoing[2]);
    ws.send('сейчас идет задание '+arr_ongoing[1]+', уже как '+timer)
  }else{
    ws.send('я недавала пока некаких заданий')
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
    if(n>1200){
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
                console.log(k)
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
                if(k>2000){
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
                console.log(k)
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
                if(k>2000){
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