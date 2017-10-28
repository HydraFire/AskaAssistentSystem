

const jetpack = require('fs-jetpack');
const commands = require('./commands');

const plus_command = function(ws,ask,text){
  let a = text.search(ask)
  let text0 = text.substring(0,a-1)
  let text1 = text.substring(text0.length+ask.length+2,text.length)
  console.log(text0+' '+text1)
  let arr_json = []
  arr_json.push(text0)
  ws.send('добавила связь, '+text0+' к команде, '+text1)
  text1 = text1.split(' ').join('_')
  jetpack.write('./JSON/data/'+ws.users.name+'/commands/'+text1+'.json',arr_json);

}
exports.plus_command = plus_command;
const new_command = function(ws){
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
        ws.send('зарегистрирована новая команда '+ws.users.input_Array[4]);
        x_x = true
      }catch(err){
        x_x = false
        console.log(err)
      }
      if(x_x){
        let arr_xx = []
        arr_xx.push('true')
        let fg = ws.users.input_Array[4]
        fg = fg.split(' ').join('_')
        jetpack.write('./JSON/data/'+ws.users.name+'/commands/'+fg+'.json',arr_xx);
      }
      clearInterval(ws.users.all_thoughts[int_00])
      ws.users.all_thoughts.splice(int_00,1)
      console.log('interval close')
    }
    if(n>60){
      clearInterval(ws.users.all_thoughts[int_00])
      ws.users.all_thoughts.splice(int_00,1)
      console.log('interval close')
    }
  },1000)
  return 'назови имя новой команды';
}
exports.new_command = new_command;

const ask = function(ws,text,v){
  let n = 0
  let t = 0
  let k = 0
  let int_id00 = ws.users.all_thoughts.length
  ws.users.all_thoughts[int_id00] = setInterval(()=>{
    n++
    //console.log(n)
    console.log("n= "+n)
    console.log(ws.users.aska_talks)
    if(!ws.users.aska_talks){
      clearInterval(ws.users.all_thoughts[int_id00])
      ws.users.all_thoughts.splice(int_id00,1)

      let int_id01 = ws.users.all_thoughts.length
      ws.users.all_thoughts[int_id01] = setInterval(()=>{
        t++
        console.log("t= "+t)
        console.log(ws.users.aska_talks)
        if(ws.users.aska_talks){
          console.log('YOU HERE <----------------')
          clearInterval(ws.users.all_thoughts[int_id01])
          ws.users.all_thoughts.splice(int_id01,1)
          let int_id02 = ws.users.all_thoughts.length
          ws.users.all_thoughts[int_id02] = setInterval(()=>{
            k++
            console.log(k)
            if(ws.users.input_Array[4] == "нет" ||ws.users.input_Array[4] == "отмена"){
              //arr_command.splice(0,1)
              console.log('clear interval_03+')
              clearInterval(ws.users.all_thoughts[int_id02])
              ws.users.all_thoughts.splice(int_id02,1)
              ws.users.input_Array[4] = "undefined"
              let answer = ["прости за эту глупость","охрана отмена","а что тогда ты пытался сказать?","окей","ага","я не поняла"]
              let random = Math.random()*answer.length |0
              console.log('random'+random)
              ws.send(answer[random])
              //ask_arr(ws,adress,arr_command,date)
            }
            if(ws.users.input_Array[4] == "да"){

              console.log('clear interval_03+')
              clearInterval(ws.users.all_thoughts[int_id02])
              ws.users.all_thoughts.splice(int_id02,1)
              ws.users.input_Array[4] = "undefined"
              console.log(v)
              //v=v.split(' ').join('_')
              let ryr = jetpack.read('./JSON/data/'+ws.users.name+'/commands/'+v+'.json','json')
              console.log(ryr)
              if(ryr[0]!='true'){
                let h = ryr[0]
                h=h.split(' ').join('_')
                let zyz = jetpack.read('./JSON/data/'+ws.users.name+'/commands/'+h+'.json','json')
                if(zyz[0]=='true'){
                  v = h
                }
              }
              v=v.split('_').join(' ')
              let arr_json = []
              arr_json.push(v)
              text = text.split(' ').join('_')
              jetpack.write('./JSON/data/'+ws.users.name+'/commands/'+text+'.json',arr_json);
              ws.send('хорошо я запомнила')
              setTimeout(()=>{
                v = v.split('_').join(' ')
                console.log(v)
                commands.run(v,ws)
              },3000)

              //ask_arr(arr_command,ws)
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
}
exports.ask = ask;
const go = function(text0,text1){
  console.log('whats up?')
  let procent0 = 0
  let procent1 = 0
  function procent_string(a,b){
    let num = 0
    if(a.length < b.length){
      let c = a
      a = b
      b = c
    }

    for(i=0;i<a.length;i++){
      //console.log(a[i]+' '+b[i]+' '+i)
      if(a[i] == b[i]){
        num+=1
      }
    }
    num = (100/b.length)*num
    num = num.toFixed(2)
    return num
  }
  procent0 = procent_string(text0,text1)
  procent0 = parseFloat(procent0)
  console.log('-------------')
  function includes_test(a,b){

    if(a.length < b.length){
      let c = a
      a = b
      b = c
    }
    let iter = a.length+1
    let num = 0
    for(i=0;i<iter;i++){

      let t = b.search(a[0])
      // let s = a.search(a[0])
      if(t == -1){
        a = a.substring(1,a.length)
        //console.log('t= '+t)
        //console.log('a= '+a)
      }else{

        //console.log('a= '+a+' '+t)
        let s = a.substring(0,t)
        //console.log('s= '+s)
        a = a.substring(1,a.length)


        //console.log('a= '+a+' '+t)
        //console.log('b= '+b)
        let z = b.substring(0,t)
        b = b.substring(t+1,b.length)
        b = z+b
        num+=1
        //console.log('b= '+b)
      }

    }
    num = (100/iter)*num
    num = num.toFixed(2)
    return num
  }
  procent1 = includes_test(text0,text1)
  procent1 = parseFloat(procent1)
  console.log('/////////////'+procent0+'  '+procent1)
  let sym = (procent0+procent1+procent1)/3
  return sym
}
exports.go = go;




