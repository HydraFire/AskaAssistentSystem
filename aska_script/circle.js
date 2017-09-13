
const jetpack = require('fs-jetpack');
const polival_kystu = require('./polival_kystu')

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
  var real_time = polival_kystu.this_real_time()
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


  let minutes = symaDate%60
  let hours = (symaDate-minutes)/60%24
  let date = ((symaDate-(hours*60)-minutes)/24/60)//

  if(minutes== 0&&hours==0 &&date==0){
    date = 'меньше одной минуты'
  }else{
    date = polival_kystu.num_to_text(date,hours,minutes)
  }
  return date
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