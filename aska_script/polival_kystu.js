
const jetpack = require('fs-jetpack')
const sendToAska = require('../main').sendToAska;
const _ = require('underscore');
const ask = require('./ask');
const napominalka = require('./napominalka');

const count_to_text = function(v){
  let date = v
  let date2 = ''
  date+=''
  if(date != 0){
    let z = date[date.length-1]
    let zz = date[date.length-2]
    let zzz = date[date.length-3]
    if(zzz == 1 ){date2 +='сто '}else
      if(zzz == 2 ){date2 +='двести '}else
        if(zzz == 3 ){date2 +='триста '}else
          if(zzz == 4 ){date2 +='четыреста '}else
            if(zzz == 5 ){date2 +='пятьсот '}else
              if(zzz == 6 ){date2 +='шестьсот '}else
                if(zzz == 7 ){date2 +='семьсот '}else
                  if(zzz == 8 ){date2 +='восемьсот '}else
                    if(zzz == 9 ){date2 +='девятьсот '}
    if(zz == 1 && z == 0){date2 +='десятый '}else
      if(zz == 1 && z == 1){date2 +='одиннадцатый '}else
        if(zz == 1 && z == 2){date2 +='двенадцатый '}else
          if(zz == 1 && z == 3){date2 +='тринадцатый '}else
            if(zz == 1 && z == 4){date2 +='четырнадцатый '}else
              if(zz == 1 && z == 5){date2 +='пятнадцатый '}else
                if(zz == 1 && z == 6){date2 +='шестнадцатый '}else
                  if(zz == 1 && z == 7){date2 +='семнадцатый '}else
                    if(zz == 1 && z == 8){date2 +='восемнадцатый '}else
                      if(zz == 1 && z == 9){date2 +='девятнадцатый '}
    if(zz == 2 && z == 0){date2 +='двадцатый '}else
      if(zz == 3 && z == 0){date2 +='тридцатый '}else
        if(zz == 4 && z == 0){date2 +='сороковой '}else
          if(zz == 5 && z == 0){date2 +='пятидесятый '}else
            if(zz == 6 && z == 0){date2 +='шестидесятый '}else
              if(zz == 7 && z == 0){date2 +='семидесятый '}else
                if(zz == 8 && z == 0){date2 +='восьмидесятый '}else
                  if(zz == 9 && z == 0){date2 +='девяностый '}else
                    if(zz == 2){date2 +='двадцать '}else
                      if(zz == 3){date2 +='тридцать '}else
                        if(zz == 4){date2 +='сорок '}else
                          if(zz == 5){date2 +='пятьдесят '}else
                            if(zz == 6){date2 +='шестьдесят '}else
                              if(zz == 7){date2 +='семьдесят '}else
                                if(zz == 8){date2 +='восемьдесят '}else
                                  if(zz == 9){date2 +='девяносто '}
    if(zz != 1 && z == 1){date2 +='первый '}else 
      if(zz != 1 && z == 2){date2 +='второй '}else 
        if(zz != 1 && z == 3){date2 +='третий '}else 
          if(zz != 1 && z == 4){date2 +='четвертый '}else 
            if(zz != 1 && z == 5){date2 +='пятый '}else 
              if(zz != 1 && z == 6){date2 +='шестой '}else 
                if(zz != 1 && z == 7){date2 +='седьмой '}else 
                  if(zz != 1 && z == 8){date2 +='восьмой '}else 
                    if(zz != 1 && z == 9){date2 +='девятый '}
    if(zzz == 1 && zz == 0 && z == 0){date2 +='юбелейный сотый '}
    if(zzz == 2 && zz == 0 && z == 0){date2 +='двухсотый '}
    if(zzz == 3 && zz == 0 && z == 0){date2 +='трехсотый '}
    if(zzz == 4 && zz == 0 && z == 0){date2 +='четырехсотый '}
    if(zzz == 5 && zz == 0 && z == 0){date2 +='пятисотый '}
    if(zzz == 6 && zz == 0 && z == 0){date2 +='шестисотый '}
    if(zzz == 7 && zz == 0 && z == 0){date2 +='семисотый '}
    if(zzz == 8 && zz == 0 && z == 0){date2 +='восьмисотый '}
    if(zzz == 9 && zz == 0 && z == 0){date2 +='девятисотый '}

  }else{date2 += 'не разу'}
  if(date != 0){
    date2 +='раз '
  }else{date2 += ''}
  return date2
}
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
//////////////////////////////////////////////////////////////////////////////////////////////////
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
  if(minutes== 0&&hours==0 &&date==0){
   date = 'меньше одной минуты'
  }else{
  date = num_to_text(date,hours,minutes)
  }
  return date
}
exports.calc_time = calc_time;
//////////////////////////////////////////////////////////////////////////////////////////////////
const A4DName_json = function(ws,adress,v,textik){
  var arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+adress+'.json','json');
  console.log('rnj0 '+arr_json)

  if(!arr_json){
    let text = adress
    console.log('text '+text+' <----')
    let arr = jetpack.list('./JSON/data/'+ws.users.name+'/graphics_data')
    console.log('----+> '+arr)
    //arr = arr.map((v)=>{return v.substring(0,v.length-5)})
    console.log(arr)
    let variantu_arr = ask.test(ws,arr,text)
    if(variantu_arr){
      console.log(' --- ')
      console.log(adress)
      console.log(variantu_arr)
      console.log(' --- ')
      ask.ask_arr(ws,adress,variantu_arr,v)
    }else{
      ws.send('я первый раз это слышу, стоит ли мне это записать?')
      ask.one(ws,adress,v)
    }
    console.log(variantu_arr)
  }else{
    if(_.isString(arr_json[0])){ //Проверка на сылку в файле
      adress = arr_json[0]
      console.log("new_adress "+adress)
      arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+adress+'.json','json');
    }
    // Здесь будет что если файл есть, но в файле переадресация
    let arr_json_last = arr_json[arr_json.length-1]
    //console.log('rnj3 '+arr_json_last)
    if(arr_json_last){
      if(arr_json_last[0] == v[0] &&
         arr_json_last[1] == v[1] &&
         arr_json_last[2] == v[2] &&
         arr_json_last[3] == v[3] &&
         arr_json_last[4] == v[4]
        ){}else{
        arr_json.push(v)
        jetpack.write('./JSON/data/'+ws.users.name+'/graphics_data/'+adress+'.json',arr_json);
        let perm = count_to_text(arr_json.length)
        ws.send(textik+' '+perm+' , перерыв составляет '+calc_time(arr_json_last))
        let napom = napominalka.calc_arr_timers(ws)
        jetpack.write('./JSON/data/'+ws.users.name+'/arr_napominalka.json',napom);
      }
    }
  }
}
///////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
const delete_last_rec = function(ws,adress){
  var arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+adress+'.json','json');
  arr_json.splice(arr_json.length-1,1)
  jetpack.write('./JSON/data/'+ws.users.name+'/graphics_data/'+adress+'.json',arr_json);
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

const then_event_bin = function(ws,this_name,textik){
  //let a = this_real_time()
  let b = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+this_name+'.json','json');
  if(!b){ 
    return 'незнаю'
  }else{
    if(_.isString(b[0])){
      b = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+b[0]+'.json','json');
    }
    let c = b[b.length-1]
    console.log(c)
    return textik+calc_time(c)+' назад';
  }
}
exports.then_event_bin = then_event_bin
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const event_doing = function(ws,this_name,textik){
  let a = this_real_time()
  A4DName_json(ws,this_name,a,textik)

  //let arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+this_name+'.json','json');
  //if(!arr_json){
  //  arr_json = "что "
  //}
  let n = 0
  let t = 0
  let k = 0
  /*
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

*/



  //return 
  }
exports.event_doing = event_doing;



