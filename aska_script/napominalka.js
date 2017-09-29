
const _ = require('underscore');
const jetpack = require('fs-jetpack')

const this_real_time = function(){
  var objData = new Date();
  var year = objData.getFullYear()
  var month = objData.getMonth();
  var date = objData.getDate();
  var hours = objData.getHours();
  var minutes = objData.getMinutes();
  return [year,month+1,date,hours,minutes]
}
const int_day_in_month = function(iu){
  let arr_month = [0,0,31,59,90,120,151,181,212,243,273,304,334,365]
  var ii = 0
  arr_month.map((v,index)=>{if(index == iu){ ii = v}})
  return ii
}
const int_day_in_year = function(v){
  switch(v) {
    case 2016:  v = 0; break;
    case 2017:  v = 365; break;
    case 2018:  v = 365+365; break;
    case 2019:  v = 365+365+365; break;
    case 2020:  v = 365+365+365+365; break;
  }
  return v
}

const check_time = function(ws){
  let real_time2 = this_real_time()
  real_time2[1] = int_day_in_month(real_time2[1])
  real_time2[0] = int_day_in_year(real_time2[0])
  let symaDate4 = (real_time2[0]*24*60)+(real_time2[1]*24*60)+(real_time2[2]*24*60)+(real_time2[3]*60)+real_time2[4]
  let arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/arr_napominalka.json','json');
  let text_speech = ''

  arr_json.forEach((v)=>{
    if(v[1]<= symaDate4){
      console.log(' '+v[0]+' '+v[1]+' '+symaDate4)
      text_speech += ', '+v[0]
    }
  })
  if(text_speech != ''){
    try{
      ws.send('рекомендовано к выполнению, '+text_speech)
    }catch(err){
      console.log(err)
    }
  }
}
exports.check_time = check_time;


const calc_arr_timers = function(ws,adress){
  console.log('Считаем')
  const nnn = function(ws,adrees){

    let arr_time_arr = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+adrees+'.json','json');

    var arr_time_pre = arr_time_arr[arr_time_arr.length-2]
    if(arr_time_pre){
      var arr_time = arr_time_arr[arr_time_arr.length-1]

      arr_time[1] = int_day_in_month(arr_time[1])
      arr_time[0] = int_day_in_year(arr_time[0])
      let symaDate1 = (arr_time[0]*24*60)+(arr_time[1]*24*60)+(arr_time[2]*24*60)+(arr_time[3]*60)+arr_time[4];


      arr_time_pre[1] = int_day_in_month(arr_time_pre[1])
      arr_time_pre[0] = int_day_in_year(arr_time_pre[0])
      var symaDate2 = (arr_time_pre[0]*24*60)+(arr_time_pre[1]*24*60)+(arr_time_pre[2]*24*60)+(arr_time_pre[3]*60)+arr_time_pre[4]

      var real_time = this_real_time()
      real_time[1] = int_day_in_month(real_time[1])
      real_time[0] = int_day_in_year(real_time[0])
      var symaDate3 = (real_time[0]*24*60)+(real_time[1]*24*60)+(real_time[2]*24*60)+(real_time[3]*60)+real_time[4]
      //symaDate = symaDate2 - the_magic_begin;
      let sup = symaDate1 - symaDate2
      let konec = symaDate3 + sup
      console.log(konec)
      return konec
    }else{
      return 99999999
    }
  }

  let arr_list = jetpack.list('./JSON/data/'+ws.users.name+'/graphics_data')
  let gra_list = jetpack.read('./JSON/data/'+ws.users.name+'/arr_napominalka.json','json')

  let poxoj = []

  arr_list.forEach((v)=>{
    let buf_arr = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+v,'json');
    if(_.isString(buf_arr[0])){
    }else{
      v = v.substring(0,v.length-5)
      poxoj.push(v)
    }
  })
  console.log(poxoj)
  //var obj = {}

  let arr_arr = []

  poxoj.forEach((v,i)=>{
    arr_arr.push([v,nnn(ws,v)])
  })
  if(gra_list){
    console.log(arr_arr)
    arr_arr.forEach((v)=>{
      console.log(adress+'  '+v[0])
      if(adress == v[0]){
        gra_list.forEach((t,i)=>{
          console.log(adress+'  '+t[0])
          if(adress == t[0]){
            console.log(gra_list[i][1]+'  ++'+v)
            gra_list[i][1] = v[1]
            console.log(gra_list[i][1]+'  ++'+arr_arr[1])
          }
        })
      }
    })
  }else{
  gra_list = arr_arr
  }
  return gra_list

}
exports.calc_arr_timers = calc_arr_timers;