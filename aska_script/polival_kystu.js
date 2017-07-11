
const jetpack = require('fs-jetpack')
const sendToAska = require('../main').sendToAska;

const num_to_text = function(date,hours,minutes){
  date+=''
  if(date != 0){
    let d = date[date.length-1]
    let dd = date[date.length-2]
    if(dd == 1){date +=' дней '}else
      if(d == 0){date +=' дней '}else
        if(d == 1){date +=' день '}else 
          if(d > 1&&d < 5){date +=' дня '}else
            if(d >= 5){date +=' дней '}
  }else{date = ''}

  hours+=''
  if(hours != 0){
    let h = hours[hours.length-1]
    let hh = hours[hours.length-2]

    if(hh == 1){hours +=' часов '}else
      if(h == 0){hours +=' часов '}else
        if(h == 1){hours +=' час '}else 
          if(h > 1&&h < 5){hours +=' часа '}else
            if(h >= 5){hours +=' часов '}
  }else{hours = ''}

  minutes+=''
  if(minutes != 0){
    let m = minutes[minutes.length-1]
    let mm = minutes[minutes.length-2]

    if(mm == 1){minutes +=' минут '}else
      if(m == 0){minutes +=' минут '}else
        if(m == 1){minutes +=' минута '}else 
          if(m > 1&&m < 5){minutes +=' минуты '}else
            if(m >= 5){minutes +=' минут '}
  }else{minutes = ''}

  return date+hours+minutes
}
const A4DName_json = function(ws,adress,v){
  var arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/'+adress+'.json','json');
  if(!arr_json){
    arr_json = [
      [
        2016,
        12,
        20,
        23,
        7,
        adress
      ]
    ]
  }
  let arr_json_last
  if(v == undefined){
    if(arr_json == undefined || arr_json == ""){
      arr_json = []
      let a = [2016,11,17,13,30]
      arr_json.push(a)
      arr_json_last = arr_json[arr_json.length-1]
      jetpack.write('./JSON/data/'+ws.users.name+'/'+adress+'.json',arr_json);
    }else{
      arr_json_last = arr_json[arr_json.length-1]
    }
  }else{
    arr_json_last = arr_json[arr_json.length-1]
    if(arr_json_last[0] == v[0] &&
       arr_json_last[1] == v[1] &&
       arr_json_last[2] == v[2] &&
       arr_json_last[3] == v[3] &&
       arr_json_last[4] == v[4]
      ){}else{
      arr_json.push(v)
      jetpack.write('./JSON/data/'+ws.users.name+'/'+adress+'.json',arr_json);
    }
  }
  return arr_json_last
}
///////////////////////////////////////////////////////////////////////////
const calc_time = function(arr_time){
  int_day_in_month = function(iu){
    let arr_month = [0,0,31,59,90,120,151,181,212,243,273,304,334,365]
    var ii = 0
    arr_month.map((v,index)=>{if(index == iu){ ii = v}})
    return ii
  }
  int_day_in_year = function(v){
    switch(v) {
      case 2016:  v = 0; break;
      case 2017:  v = 365; break;
      case 2018:  v = 365+365; break;
      case 2019:  v = 365+365+365; break;
      case 2020:  v = 365+365+365+365; break;
    }
    return v
  }
  arr_time[1] = int_day_in_month(arr_time[1])
  arr_time[0] = int_day_in_year(arr_time[0])
  let the_magic_begin = (arr_time[0]*24*60)+(arr_time[1]*24*60)+(arr_time[2]*24*60)+(arr_time[3]*60)+arr_time[4];
  var real_time = this_real_time()
  real_time[1] = int_day_in_month(real_time[1])
  real_time[0] = int_day_in_year(real_time[0])
  var symaDate = (real_time[0]*24*60)+(real_time[1]*24*60)+(real_time[2]*24*60)+(real_time[3]*60)+real_time[4]
  symaDate = symaDate - the_magic_begin;
  let minutes = symaDate%60
  let hours = (symaDate-minutes)/60%24
  let date = ((symaDate-(hours*60)-minutes)/24/60)//
  date = num_to_text(date,hours,minutes)
  return date
}
exports.calc_time = calc_time;
////////////////////////////////////////////////////////////////////////
const delete_last_rec = function(ws,adress){
  var arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/'+adress+'.json','json');
  arr_json.splice(arr_json.length-1,1)
  jetpack.write('./JSON/data/'+ws.users.name+'/'+adress+'.json',arr_json);
}

const this_real_time = function(){
  var objData = new Date();
  var year = objData.getFullYear()
  var month = objData.getMonth();
  var date = objData.getDate();
  var hours = objData.getHours();
  var minutes = objData.getMinutes();
  return [year,month+1,date,hours,minutes]
}
exports.this_real_time = this_real_time;

exports.when_watered = function(ws,this_name,textik){
  let b = A4DName_json(ws,this_name)
  return textik+calc_time(b)+' назад';
}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
exports.poured_flowers = function(ws,this_name,textik){
  let a = this_real_time()
  a.push(this_name)
  console.log(ws.users.name+'<------------------------2')
  let b = A4DName_json(ws,this_name,a)
  let c = jetpack.read('./JSON/data/'+ws.users.name+'/'+this_name+'.json','json');
  if(!c){
    c = [
      [
        2016,
        11,
        17,
        13,
        30
      ],
      [
        2017,
        6,
        11,
        7,
        34,
        this_name
      ]
    ]
  }
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
        console.log(t)
        if(ws.users.aska_talks){
          //console.log('второй этап')
          clearInterval(ws.users.all_thoughts[int_i01])
          ws.users.all_thoughts.splice(int_i01,1)


          let int_i02 = ws.users.all_thoughts.length
          ws.users.all_thoughts[int_i02] = setInterval(()=>{
            k ++
            console.log(k)
            if(ws.users.input_Array[4].includes('не говорил')||
               ws.users.input_Array[4].includes('не делал')){
              //console.log('третий этап')
              clearInterval(ws.users.all_thoughts[int_i02])
              ws.users.all_thoughts.splice(int_i02,1)
              ws.send('прости, сейчас всё исправлю')
              delete_last_rec(ws,this_name)
            }
            if(k > 15){
              clearInterval(ws.users.all_thoughts[int_i02])
              ws.users.all_thoughts.splice(int_i02,1)
            }
          },1000)
        }
      },1000)
    }
  },1000)





  return textik+c.length+' раз';
}




