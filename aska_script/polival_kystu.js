
const jetpack = require('fs-jetpack')
const sendToAska = require('../main').sendToAska;

A4DName_json = function(adress,v){
  var arr_json = jetpack.read('./JSON/data/HydraFire/'+adress+'.json','json');
  let arr_json_last
  if(v == undefined){
    if(arr_json == undefined || arr_json == ""){
      arr_json = []
      let a = [2016,11,17,13,30]
      arr_json.push(a)
      arr_json_last = arr_json[arr_json.length-1]
      jetpack.write('./JSON/data/HydraFire/'+adress+'.json',arr_json);
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
      jetpack.write('./JSON/data/HydraFire/'+adress+'.json',arr_json);
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
  // alert(arr_time[0]+' '+arr_time[1])
  let the_magic_begin = (arr_time[0]*24*60)+(arr_time[1]*24*60)+(arr_time[2]*24*60)+(arr_time[3]*60)+arr_time[4];
  // alert(the_magic_begin)
  var real_time = this_real_time()
  // alert(real_time)
  real_time[1] = int_day_in_month(real_time[1])
  real_time[0] = int_day_in_year(real_time[0])
  var symaDate = (real_time[0]*24*60)+(real_time[1]*24*60)+(real_time[2]*24*60)+(real_time[3]*60)+real_time[4]
  // alert(symaDate)
  symaDate = symaDate - the_magic_begin;
  // alert(symaDate)
  let minutes = symaDate%60
  let hours = (symaDate-minutes)/60%24
  let date = ((symaDate-(hours*60)-minutes)/24/60)//
  // month = 
  // year = 

  if(date>1){date+=' дня,'}else
    if(date==1){date+=' день,'}else{date = ' ,'}
  
  if(hours==0){hours =', '}else
    if(hours==1){hours+=' час,'}else
      if(hours>5){hours+=' часов,'}else{hours += ' часа,'}
  if(minutes==1){minutes =', одна минута'}else
    if(minutes==2){minutes =', две минуты'}else
      if(minutes==3){minutes =', три минуты'}else
        if(minutes==4){minutes =', четыри минуты'}else
          if((minutes%10)==1){minutes+=' минута,'}else
            if((minutes%10)==2){minutes+=' минута'}else
              if(minutes==22){minutes+=' минуты'}else
                if(minutes==13){minutes+=' минут'}else
                  if((minutes%10)==3){minutes+=' минута'}else
                    if(minutes==14){minutes+=' минут'}else
                      if((minutes%10)==4){minutes ='четвертая минута'}else
                        if(minutes==0){hours ='и ровно'+hours; minutes=', '}else{minutes +=' минут'}

  return date+' '+hours+' '+minutes
}
exports.calc_time = calc_time;
////////////////////////////////////////////////////////////////////////
const delete_last_rec = function(adress){
 var arr_json = jetpack.read('./JSON/data/HydraFire/'+adress+'.json','json');
  arr_json.splice(arr_json.length-1,1)
  jetpack.write('./JSON/data/HydraFire/'+adress+'.json',arr_json);
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

exports.when_watered = function(this_name,textik){
  
  let b = A4DName_json(this_name)
  return textik+calc_time(b)+' назад';
}

exports.poured_flowers = function(this_name,textik,ws){
  let a = this_real_time()
  a.push(this_name)

  let b = A4DName_json(this_name,a)
  let c = jetpack.read('./JSON/data/HydraFire/'+this_name+'.json','json');
 
  
  
  interval_01 = setInterval(()=>{
    if(global.aska_state_01 == false){
      console.log('первый этап')
      clearInterval(interval_01)
      
      interval_02 = setInterval(()=>{
        if(global.aska_state_01 == true){
          console.log('второй этап')
          clearInterval(interval_02)
          let interval_03;
          clearInterval(interval_03);
          let time = 0
          interval_03 = setInterval(()=>{
            time += 1
            if(global.aska_state_00.includes('не говорил')){
              console.log('третий этап')
              clearInterval(interval_03)
              sendToAska('прости, сейчас всё исправлю',ws)
              delete_last_rec(this_name)
            }
            if(time == 15){
             clearInterval(interval_03)
            }
          },1000)
        }
      },1000)
    }
  },1000)
  
  
  
  
  
  return textik+c.length+' раз';
}




