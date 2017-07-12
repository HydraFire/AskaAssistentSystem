



const jetpack = require('fs-jetpack');


const rec = function(ws,answer,adres,user){
  ws.users.int_end = 'START'
  console.log('REC')
  ws.users.silence = true
  //console.log('HERE <---------------')
  let dreems = jetpack.read('./JSON/data/'+user+'/'+adres,'json')

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
        ws.send('сообщение отправлено')
        console.log('я всё окуратно записала')
        dreems.push(arr_interval)

        //sendToAska('SYSTEM '+JSON.stringify(arr_interval),ws)
        ws.users.int_end = 'END';
        jetpack.write('./JSON/data/'+user+'/'+adres,dreems);
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
exports.rec = rec;


const read = function(ws,line,adres){
  let n = 0
  let t = 0
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

          if(line == 'last'){
            let dreems = jetpack.read('./JSON/data/'+ws.users.name+'/'+adres,'json')
            if(!dreems){
             dreems = [["пока нет некаких сообщений"]]
            }
            let arr = dreems[dreems.length-1]
            console.log(arr)
            ws.send(arr.join(' , '))
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
}
exports.read = read;