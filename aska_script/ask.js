

const jetpack = require('fs-jetpack');
const _ = require('underscore');
//пишу функцию
const save_link = function(v){
  console.log(v)
}
const ask_arr = function(ws,adress,arr_command,date){
  let n = 0
  let t = 0
  let k = 0
  console.log('--------------> '+arr_command[0])
  if(arr_command[0] != undefined){
    ws.send('может это тоже что ,'+arr_command[0])

    let int_id00 = ws.users.all_thoughts.length
    ws.users.all_thoughts[int_id00] = setInterval(()=>{
      n++
      //console.log(n)
      console.log("n= "+n)
      ws.sendlog("n= "+n)
      console.log(ws.users.aska_talks)
      ws.sendlog(ws.users.aska_talks)
      if(!ws.users.aska_talks){
        clearInterval(ws.users.all_thoughts[int_id00])
        ws.users.all_thoughts.splice(int_id00,1)

        let int_id01 = ws.users.all_thoughts.length
        ws.users.all_thoughts[int_id01] = setInterval(()=>{
          t++
          console.log("t= "+t)
          ws.sendlog("t= "+t)
          console.log(ws.users.aska_talks)
          if(ws.users.aska_talks){
            console.log('YOU HERE <----------------')
             console.log('ВОТ ЭТО МЕСТО2')
            ws.sendlog('YOU HERE <----------------')
            clearInterval(ws.users.all_thoughts[int_id01])
            ws.users.all_thoughts.splice(int_id01,1)

            if(arr_command.length > 0){

              // remind('всё','dreamsCome_true.json',ws)

              let int_id02 = ws.users.all_thoughts.length
              ws.users.all_thoughts[int_id02] = setInterval(()=>{
                k++
                console.log(k)
                if(ws.users.input_Array[4] == "нет"){
                  arr_command.splice(0,1)
                  console.log('clear interval_03+')
                  clearInterval(ws.users.all_thoughts[int_id02])
                  ws.users.all_thoughts.splice(int_id02,1)
                  ws.users.input_Array[4] = "undefined"
                  ask_arr(ws,adress,arr_command,date)
                }
                if(ws.users.input_Array[4] == "да"){

                  console.log('clear interval_03+')
                  clearInterval(ws.users.all_thoughts[int_id02])
                  ws.users.all_thoughts.splice(int_id02,1)
                  ws.users.input_Array[4] = "undefined"

                  let buf_arr = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+arr_command[0]+'.json','json');
                  if(_.isString(buf_arr[0])){
    
                    ws.send('я розширяю количество связей ,'+adress+','+buf_arr[0])
                    let arr_json = []
                    let date = buf_arr[0]
                    arr_json.push(date)
                    jetpack.write('./JSON/data/'+ws.users.name+'/graphics_data/'+adress+'.json',arr_json);
                  }else{

                    ws.send('я запомнила связь ,'+adress+','+arr_command[0])
                    let arr_json = []
                    let date = arr_command[0]
                    arr_json.push(date)
                    jetpack.write('./JSON/data/'+ws.users.name+'/graphics_data/'+adress+'.json',arr_json);
                  }
                  //save_link(arr_command[0])
                  //ask_arr(arr_command,ws)
                }
                if(ws.users.input_Array[4] == "отмена"){
                  console.log('clear interval_03+')
                  clearInterval(ws.users.all_thoughts[int_id02])
                  ws.users.all_thoughts.splice(int_id02,1)
                  ws.users.input_Array[4] = "undefined"
                }

                if(k>2000){
                  console.log('clear interval_03')
                  clearInterval(ws.users.all_thoughts[int_id02])
                  ws.users.all_thoughts.splice(int_id02,1)
                }
              },500)
            }else{
              ws.send("конец")
              return false
              /*
            let arr_re = Array.from(arr_command)
            arr_re.splice(0,1)
            let text1 = listener_of_end(arr_re,ws)
            try{
              sendToAska(text1,ws)
            }catch(err){
              console.log(err)
            }
            */
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
    ws.send('я записала событие и текущее время, теперь всегда можешь спрашивать это, и связаную с ней информацию ,'+adress)
    let arr_json = []
    //console.log(arr_json)
    arr_json.push(date)
    jetpack.write('./JSON/data/'+ws.users.name+'/graphics_data/'+adress+'.json',arr_json);
  }
}
exports.ask_arr = ask_arr;

const one = function(ws,text,v){
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
            ws.sendlog(k)
            console.log('ВОТ ЭТО МЕСТО')
            if(ws.users.input_Array[4] == "нет" ||ws.users.input_Array[4] == "отмена"){
              //arr_command.splice(0,1)
              console.log('clear interval_03+')
              ws.sendlog('clear interval_03+')
              clearInterval(ws.users.all_thoughts[int_id02])
              ws.users.all_thoughts.splice(int_id02,1)
              ws.users.input_Array[4] = "undefined"
              //ask_arr(ws,adress,arr_command,date)
            }
            if(ws.users.input_Array[4] == "да"){

              console.log('clear interval_03+')
              clearInterval(ws.users.all_thoughts[int_id02])
              ws.users.all_thoughts.splice(int_id02,1)
              ws.users.input_Array[4] = "undefined"
              let arr_json = []
              arr_json.push(v)
              jetpack.write('./JSON/data/'+ws.users.name+'/graphics_data/'+text+'.json',arr_json);
              ws.send('я записала событие и текущее время, теперь всегда можешь спрашивать это, и связаную с ней информацию')
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
exports.one = one;
const test = function(ws,arr,text){
  let fg = text.split('_')
  let fg_pro = Math.floor(fg[0].length/2)
  console.log('fg_pro '+fg_pro)
  fg[0] = fg[0].substring(0,fg[0].length-fg_pro)
  console.log(fg[0])
  if(fg[1] == "на"||
     fg[1] == "в"||
     fg[1] == "у"||
     fg[1] == "к"||
     fg[1] == "с"
    ){
    fg[1] = fg[2]
  }
  let fg_pro1 = Math.floor(fg[1].length/2)
  console.log('fg_pro '+fg_pro1)
  fg[1] = fg[1].substring(0,fg[1].length-fg_pro1)
  console.log(fg[1])

  let poxoj = []


  //console.log(list_arr)
  arr.forEach((v)=>{
    if(v.includes(fg[0])){
      v = v.substring(0,v.length-5)
      poxoj.push(v)
    }
    if(v.includes(fg[1])){
      v = v.substring(0,v.length-5)
      poxoj.push(v)
    }
  })
  if(poxoj.length == 0){
    poxoj = false
  }
  return poxoj
  /*
  if(poxoj0 != ''){
    let po4istil_zubu = []
    po4istil_zubu.push(poxoj0)
    console.log('poxoj2 '+po4istil_zubu)
    ask.ask_arr(adress,v,po4istil_zubu,ws)
  }
  */
}
exports.test = test;







