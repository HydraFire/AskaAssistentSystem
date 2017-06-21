
const jetpack = require('fs-jetpack');

//const when_watered = require('./aska_script/polival_kystu').when_watered;
//const poured_flowers = require('./aska_script/polival_kystu').poured_flowers;
const this_real_time = require('./polival_kystu').this_real_time;

var int_day_in_month = function(iu){
  let arr_month = [0,0,31,59,90,120,151,181,212,243,273,304,334,365]
  var ii = 0
  arr_month.map((v,index)=>{if(v <= iu){ ii = index}})
  return ii
}
var int_day_in_month_back = function(iu){
  let arr_month = [0,0,31,59,90,120,151,181,212,243,273,304,334,365]
  var ii = 0
  arr_month.some((v,index)=>{if(iu >= v){ ii = index}})
  iu =-iu
  iu = arr_month[ii] - iu 
  return iu
}
var int_day_in_year = function(v){
  switch(v) {
    case 2016:  v = 0; break;
    case 2017:  v = 365; break;
    case 2018:  v = 365+365; break;
    case 2019:  v = 365+365+365; break;
    case 2020:  v = 365+365+365+365; break;
  }
  return v
}
const calc_math = function(arr_time,par){


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
  let wgu = symaDate/1440|0
  symaDate-= (wgu*480)
  console.log(symaDate)

  let textstr

  if(par != 'minutes'){
    let minutes = symaDate%60
    let hours = (symaDate-minutes)/60%24
    let date = ((symaDate-(hours*60)-minutes)/24/60)//
    if(hours <= 0){
      hours=-hours
    }
    console.log(minutes)
    if(minutes <= 0){
      minutes=-minutes
    }
    console.log(minutes)
    if(date <= 0){
      date=-date
    }
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

    textstr = date+' '+hours+' '+minutes
  }else{
    symaDate=-symaDate
    textstr = symaDate
  }
  console.log(textstr)
  return textstr
}
exports.calc_math = calc_math;
/////////////////////////////////////////////////////////
const calc_into_time = function(arr,min){

  var real_time = arr
  // alert(real_time)
  real_time[1] = int_day_in_month(real_time[1])
  real_time[0] = int_day_in_year(real_time[0])
  var symaDate = (real_time[0]*24*60)+(real_time[1]*24*60)+(real_time[2]*24*60)+(real_time[3]*60)+real_time[4]
  console.log(symaDate+' --  '+min)
  symaDate = symaDate + min;
  let minutes = symaDate%60
  let hours = (symaDate-minutes)/60%24
  let date = ((symaDate-(hours*60)-minutes)/24/60)//
  date = date - 366
  date = int_day_in_month_back(date)

  let arr_arr = [
    2017,
    6,
    date,
    hours,
    minutes
  ]

  //console.log(symaDate)

  return arr_arr
}
const calc_arr_minus_arr = function(arr,arr2){
  arr[1] = int_day_in_month(arr[1])
  arr[0] = int_day_in_year(arr[0])
  var symaDate = (arr[0]*24*60)+(arr[1]*24*60)+(arr[2]*24*60)+(arr[3]*60)+arr[4]
  console.log(symaDate+' --  ')
  arr2[1] = int_day_in_month(arr2[1])
  arr2[0] = int_day_in_year(arr2[0])
  var symaDate2 = (arr2[0]*24*60)+(arr2[1]*24*60)+(arr2[2]*24*60)+(arr2[3]*60)+arr2[4]


  symaDate = symaDate2 - symaDate;
  console.log(symaDate+' -- ------------------------- ')
  return symaDate
}
///////////////////////////////////////////////////////////////////////////
exports.sigi_remove = function(resorse_name,rate,ws){
  let circle_num = [rate]
  jetpack.write('./JSON/data/'+ws.x_user+'/circle_'+resorse_name+'_num.json',circle_num)
  return 'Новая неделя пошла, рейты '+rate+' '+resorse_name+' в неделю'
}
///////////////////////////////////////////////////////////////////////////
exports.sigi_minus = function(resorse_name,rate,date,ws){
  let sxx = sigi(resorse_name,rate,ws)
  let circle_num = jetpack.read('./JSON/data/'+ws.x_user+'/circle_'+resorse_name+'_num.json','json')
  if(!circle_num){
    circle_num = [rate]
    jetpack.write('./JSON/data/'+ws.x_user+'/circle_'+resorse_name+'_num.json',circle_num)
  }
  let giu = parseFloat(circle_num[0]) -1;
  circle_num[0] = giu
  jetpack.write('./JSON/data/'+ws.x_user+'/circle_'+resorse_name+'_num.json',circle_num)
  let ix
  let arr_timeX = date;
  ix = calc_math(arr_timeX,'minutes')
  ix = ix / parseFloat(circle_num[0])|0

  let arr_ix = []
  let ki = 0
  let siple_arr
  let zzz = parseFloat(circle_num[0])
  for(i=0;i<zzz;i++){
    ki +=ix
    siple_arr = calc_into_time(this_real_time(),ki)
    if(siple_arr[3] > 8){
      arr_ix.push(siple_arr)
    }else{
      ki +=480
      siple_arr = calc_into_time(this_real_time(),ki)
      arr_ix.push(siple_arr)
    }
  }

  jetpack.write('./JSON/data/'+ws.x_user+'/circle_'+resorse_name+'_arr.json',arr_ix)
  console.log(arr_ix)

  console.log(sxx)
  if(arr_ix[0] != undefined){
    if(sxx.includes('не курил')){
      sxx = 'Спасибо что дождался, только так мы победим '+resorse_name
    }else{
      sxx = 'Почему недождался? Нужно держать '+resorse_name+' под контролем'
    }
  }else{
    sxx = 'Всё '+resorse_name+' закончелись, всё отличьно мы справелись, теперь всё по новой, но ставим чуть меньше рэйты'
  }
  return sxx
}
///////////////////////////////////////////////////////////////////////////
const sigi = function(resorse_name,rate,ws){
  console.log('ХУРА')





  let circle_num = jetpack.read('./JSON/data/'+ws.x_user+'/circle_'+resorse_name+'_num.json','json')
  if(!circle_num){
    circle_num = [rate]
    jetpack.write('./JSON/data/'+ws.x_user+'/circle_'+resorse_name+'_num.json',circle_num)
  }
  let circle_arr = jetpack.read('./JSON/data/'+ws.x_user+'/circle_'+resorse_name+'_arr.json','json')
  if(!circle_arr){
    circle_arr = [
      [
        2017,
        6,
        18,
        22,
        10
      ],
      [
        2017,
        6,
        18,
        22,
        30
      ]
    ]
  }
  let xhx
  if(circle_arr[0] != undefined){
    xhx = calc_math(circle_arr[0],'minutes')
    //xhx = parseFloat(xhx)
    console.log('dsfsdfsdf xhx '+xhx)
    if(xhx <= 0){
      let arr_z = calc_arr_minus_arr(circle_arr[1],circle_arr[0])
      console.log("----------xxx-----------")
      console.log(arr_z)
      let rry = calc_into_time(circle_arr[0],arr_z)
      console.log(rry)
      xhx = calc_math(rry,'text')
      xhx = 'не курил уже '+xhx
    }else{
      let minutes = xhx%60
      let hours = (xhx-minutes)/60%24
      
      xhx = hours+' часов '+minutes
      xhx = 'осталось подождать всего '+xhx+' минут'
    }
  }else{
    xhx = 'Всё '+resorse_name+' закончелись'
  }
  return xhx
}
exports.sigi = sigi