

const jetpack = require('fs-jetpack');
const calc_layers = require('./neural_network').calc_layers;
const this_real_time = require('./polival_kystu').this_real_time;
const napominalka = require('./napominalka');

/////////////////////////////////////////////////////////////////
function get_info(ws){
  let message = 'SYSTEM';
  let userInfo = 'Ваш пользователь: '+ws.users.name;
  message += userInfo+'<br><br>'
  let version = 'Текущая версия программы 0.301<br>'
  message += version+'<br>'
  let way = './JSON/data/'+ws.users.name+'/NN_Train.json'
  console.log(way)
  //let way2 = './JSON/data/'+ws.users.name+'/NN_train_buffer.json'
  //try{
  //let brainSize = jetpack.inspect(way2).size
  //}catch(err){console.log(err);brainSize =10000000}
  let arrL = calc_layers(ws,way)
  message += '<br>'
  message += '[ входящий слой:  '+arrL[0]+'  ]<br>'
  message += '[ внутрених нейронов:  '+arrL[1]+'  ]<br>'
  message += '[ выходяший слой:  '+arrL[2]+'  ]<br>'
  message += '<br>'
  //message += 'Размер нейро сети '+(brainSize/1000000).toFixed(2)+' МБ.'
  ws.send(message)
}






const login = function(ws,message){
  message = message.toString().substring(4,message.length);
  let login_data = message.split('//')
  console.log(login_data)
 let arr_ip_id = jetpack.read('./JSON/data/users_login.json','json')
  let dont_now_pass = 0
  arr_ip_id.forEach((v)=>{
    if(login_data[0] == v[0]){
      if(login_data[1] == v[1]){
        if(ws.users.all_thoughts){
          ws.users.all_thoughts.forEach((v)=>{clearInterval(v)});
          clearInterval(ws.users.napomni)
          console.log('CLOSE CONNECTION')
        }
        ws.users = []
        ws.users['name'] = login_data[0];
        ws.users.input_Array = ['','','','','']
        ws.users.output_Array = ['','','','']
        ws.users.track = 'none'
        ws.users.nn = false
         ws.users.last_track = []
        ws.users.all_thoughts = []
        ws.users.napomni = ''
        ws.users.zet = ''
        ws.users.new_par = true
        ws.users.attention = 'LISTEN'
        ws.users.nn_out_arr = ['null','null','null','null']
        ws.users.silence = false
        ws.users.aska_talks = false
        ws.sendlog = function(text){
          text = JSON.stringify(text)
        ws.send('SYSTEM'+text)
        }
        console.log('CONECTION '+ws.users.name)
        get_info(ws)
        setTimeout(()=>{
          if(jetpack.read('./JSON/data/'+ws.users.name+'/arr_napominalka.json','json')){
            let every_day = jetpack.read('./JSON/data/'+ws.users.name+'/every_day.json','json')
            if(!every_day){
             every_day = [0]
             jetpack.write('./JSON/data/'+ws.users.name+'/every_day.json',every_day)
            }
             let objData = new Date();
             let date = objData.getDate();
             let hours = objData.getHours();
            //if(every_day != date && hours > 5){
            // ws.send('BOOMERANG'+'привет')
           // }else{
             napominalka.check_time(ws)
            //}
            
            ws.users.napomni = setInterval(()=>{
              napominalka.check_time(ws)
              console.log('napominanie')
            },660000)
          }
        },1000)
        setTimeout(()=>{
              var m = setInterval(()=>{
                //console.log('yo')
                if(ws.users.aska_talks){
                  let arr = jetpack.read('./JSON/data/'+ws.users.name+'/one_time_napominanie.json','json')
                  if(arr){
                  let n_arr = []
                  let arr_k = ''
                  let t = new Date()
                  t = Date.parse(t)
                  arr.forEach((v,i)=>{
                   let f = new Date(v[0])
                   f = Date.parse(f)
                   console.log('t='+t+' f='+f)
                   if(t>f){
                     arr_k+=v[1]+', '
                   }else{
                     n_arr.push(v)
                   }
                  })
                  ws.send(arr_k)
                  jetpack.write('./JSON/data/'+ws.users.name+'/one_time_napominanie.json',n_arr)
                  }
                  clearInterval(m)
                }
              },1000)
        },5000)
      }
    }
  })
  // ws.terminate()
  /*
  arr_ip_id.some(v=>{
    if(v[1] == message){ return message = v[0]}else{message = message}
  })
  */

  //ws['x_user'] = message;

  //global.playing_music = 'none'
  //global[ws.x_user] = [' ',' ',' ',' ',' ']
  return 'login'
}

exports.login = login;