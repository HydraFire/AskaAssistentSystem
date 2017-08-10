
const _ = require('underscore');
const jetpack = require('fs-jetpack');
const polival_kystu = require('./polival_kystu');
const aska_DJ = require('./aska_DJ');
const NNQ = require('./NN_quest');
const quest = require('./quest');
const circle = require('./circle')
const memory_fun = require('./memory_fun');
const webSearch = require('./webSearch');
const messenger = require('./messenger');
//const ask = require('./ask');
//const when_watered = require('./aska_script/polival_kystu').when_watered;
//const poured_flowers = require('./aska_script/polival_kystu').poured_flowers;
//const this_real_time = require('./aska_script/polival_kystu').this_real_time;


exports.commands = function(strx,ws){
  console.log(global[ws.users.name])
  console.log('Ответ нейроной сети |'+strx+'|')
  if(ws.users.all_thoughts.length == 0){
    ///////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    if(ws.users.input_Array[4].includes('запом')){
      let ask = ws.users.input_Array[2]
      let answer = ws.users.input_Array[3]
      if(ask == ' ' || answer == ' '){
        strx = 'я немогу запомнить пустую информацию'
      }else{
        strx = memory_fun.save(ask,answer,ws)
      }
      ws.send(strx)
      strx = ''
    }
    if(ws.users.input_Array[4].includes('подума') ||
       ws.users.input_Array[4].includes('обучение')){
      strx = NNQ.aska_learn_quest_main(ws)
      ws.send(strx)
    }
    if(ws.users.input_Array[4].includes('заткнись') ||
       ws.users.input_Array[4].includes('помолчи')){
      ws.users.attention = 'NO LISTEN'
      ws.send('EVALwindow.color_aska_h = 20;aska("режим ожидания")')
      strx = ''
    }

    if(ws.users.input_Array[4].includes('прочитай')){
      ws.send('EVALreadClipboard()')
      strx = ''
    }
    /*
    if(ws.users.input_Array[4].includes('пишу функцию')){
     //ws.send('EVALreadClipboard()')
     let po4istil_zubu = ["лимон","мандарин","помидор","банлажан"]
     let gogo = ask.ask_arr(po4istil_zubu,ws)
     console.log(gogo+'    <-----------------------')
     //ws.send("внимание")
     strx = ''
    }
*/

    if(ws.users.input_Array[4].includes('вакансии джаваскрипт')){
      let site = 'https://rabota.ua/jobsearch/vacancy_list?regionId=1&keyWords=JavaScript';
      let leng = 360
      let search_text = `<p style="cursor: pointer;" onclick="javascript: window.location =`
      webSearch.post_to_str(ws,site,leng,search_text)
      strx = ''
    }
    if(ws.users.input_Array[4].includes('вакансии игры')){
      let site = 'https://rabota.ua/jobsearch/vacancy_list?regionId=1&keyWords=game';
      let leng = 360
      let search_text = `<p style="cursor: pointer;" onclick="javascript: window.location =`
      webSearch.post_to_str(ws,site,leng,search_text)
      strx = ''
    }
    if(strx.includes('ua0') &&
       strx.includes('ua1') &&
       strx.includes('ua2') &&
       strx.includes('ua3')){
      ws.send('диктуй текст сообщения')
      let userM = ''
      if(ws.users.name == 'HydraFire'){
        userM = 'Noir'
      }else{
        userM = 'HydraFire'
      }
      messenger.rec(ws,'всё','all_messege.json',userM)
      strx = ''
    }
    if(strx.includes('ub0') &&
       strx.includes('ub1') &&
       strx.includes('ub2') &&
       strx.includes('ub3') &&
       strx.includes('ub4')){
      ws.send('сообщение от пользователя HydraFire')
      setTimeout(()=>{
        messenger.read(ws,'last','all_messege.json')
      },2000)
      strx = ''
    }


    /*
  if(global[ws.x_user][4].includes('найди')){
     let site = 'https://www.youtube.com/channel/UCdKuE7a2QZeHPhDntXVZ91w';
     let leng = 50
     let search_text = `<a class="yt-uix-sessionlink yt-uix-tile-link  spf-link  yt-ui-ellipsis yt-ui-ellipsis-2" dir="ltr" title="`
     webSearch.post_to_str(ws,site,leng,search_text)
     strx = ''
    }
    */
    //////////////////////////////// USERS /////////////////////////////////////
    // if(windowManager.sharedData.fetch('buffer_text').includes('HydraFire')){
    //   strx = 'Хозяин, желаешь чего?'
    // }
    // if(windowManager.sharedData.fetch('buffer_text').includes('unidentified')){
    //    strx = 'Внимание, ваш ip адрес, не закреплен, ни за одним, из пользователей, обратитесь к анминистратору'
    //}
    /*
  if(windowManager.sharedData.fetch('buffer_text').includes('звуки природы')){
    let links = [
      "https://www.youtube.com/embed/YnvOQji6zZ0?ecver=1",
      "https://www.youtube.com/embed/5lCRsLjMeso?ecver=1",
      "https://www.youtube.com/embed/wr-iG8_GJeI?ecver=1",
      "https://www.youtube.com/embed/qI6J2dPmGAk?ecver=1",
      "https://www.youtube.com/embed/I4z-Ezs31NU?ecver=1",
      "https://www.youtube.com/embed/-UWDxpF1wBg?ecver=1"
                ]
    strx = webSearchYouTube.webSearch(links,ws)
  }
  ///////////////////////////////////////////////////////////////////////////////  
  ///////////////////////////////////////////////////////////////////////////////
  */

    if(strx.includes('fa0') &&
       strx.includes('fa1') &&
       strx.includes('fa2') &&
       strx.includes('fa3')){
      let htmlx = ''
      let arr = jetpack.list('./public/users/'+ws.users.name)
      if(arr){
        arr.forEach(v=>htmlx+=`<p><a href="./public/users/${ws.users.name}/${v}" download>${v}</a></p>`)
        ws.send('SYSTEM'+htmlx)
        strx = ''
      }else{
        strx = 'еще нет некаких файлов, чтобы их добавить переташи файл на DropBox'
      }
    }
    if(strx.includes('fb0') &&
       strx.includes('fb1') &&
       strx.includes('fb2') &&
       strx.includes('fb3')){
      let htmlx = ''
      let arr = jetpack.list('./public/users/'+ws.users.name+'/music')
      if(arr){
        arr.forEach((v)=>{
          if(ws.users.track == v){
            htmlx+=`<p><a style="color:red;" href="./public/users/${ws.users.name}/music/${v}" download>${v}</a></p>`
          }else{
            htmlx+=`<p><a href="./public/users/${ws.users.name}/music/${v}" download>${v}</a></p>`
          }
        })
        ws.send('SYSTEM'+htmlx)
        strx = ''
      }else{
        strx = 'еще нет некаких файлов, чтобы их добавить переташи файл на DropBox'
      }
    }
    /*
    if(strx.includes('sa0') &&
       strx.includes('sa1') &&
       strx.includes('sa2') &&
       strx.includes('sa3')){
      let rate = 44
      strx = circle.sigi_remove('сигареты',rate,ws)
      ws.send(strx);strx = '';
    }
    if(strx.includes('sb0') &&
       strx.includes('sb1') &&
       strx.includes('sb2') &&
       strx.includes('sb3')){
      let rate = 44
      strx = circle.sigi('сигареты',rate,ws)
      ws.send(strx);strx = '';
    }
    if(strx.includes('sc0') &&
       strx.includes('sc1') &&
       strx.includes('sc2') &&
       strx.includes('sc3') &&
       strx.includes('sc4')){
      let arr_timeX = 
          [
            2017,
            6,
            23,
            23,
            59
          ]
      let rate = 44
      strx = circle.sigi_minus('сигареты',rate,arr_timeX,ws)
      ws.send(strx);strx = '';
    }
    //////////////////////////////////////////////////////////////////////////
    if(strx.includes('ba0') &&
       strx.includes('ba1') &&
       strx.includes('ba2') &&
       strx.includes('ba3')){
      let rate = 26
      strx = circle.sigi_remove('банки',rate,ws)
      ws.send(strx);strx = '';
    }
    if(strx.includes('bb0') &&
       strx.includes('bb1') &&
       strx.includes('bb2') && 
       strx.includes('bb3')){
      let rate = 26
      strx = circle.sigi('банки',rate,ws)
      ws.send(strx);strx = '';
    }
    if(strx.includes('bc0') &&
       strx.includes('bc1') &&
       strx.includes('bc2') && 
       strx.includes('bc3') &&
       strx.includes('bc4')){
      let arr_timeX = 
          [
            2017,
            6,
            28,
            23,
            59
          ]
      let rate = 26
      strx = circle.sigi_minus('банки',rate,arr_timeX,ws)
      ws.send(strx);strx = '';
    }
    */
    if(strx.includes('bd0') &&
       strx.includes('bd1') &&
       strx.includes('bd2') &&
       strx.includes('bd3')){
      let mki = jetpack.read('./public/users/'+ws.users.name+'/secred_text.json','text')
      ws.send(mki);strx = '';
    }

    ///////////////////////////////////////////////////////////////////////
    //                 ЗАПОМИНАЛКА ЛЮБЫХ СОБЫТИЙ
    /////////////////////////////////////////////////////////////////////////
    console.log(`
////////////////////////////
///ALL//INTERVAL//CLEAR/////
////////////////////////////`)

    if(ws.users.input_Array[4].charAt(0) == 'я'){
      let arr_test = ws.users.input_Array[4].split(' ')
      if(arr_test.length == 3||arr_test.length == 4){
        arr_test.splice(0,1)
        let x_name = arr_test.join('_')
        let textik = ["Ясно","Хорошо","Наконецьто","Отличьно","Замечательно","Умничька"]
        let random = Math.random()*textik.length-1|0
        strx = polival_kystu.event_doing(ws,x_name,textik[random]+', на моей памяти , '+arr_test[0]+' '+arr_test[1]+' это уже получаеться',ws)
        ws.send(strx);strx = '';
      }
    }
    if(ws.users.input_Array[4].charAt(6) == 'я'){
      let arr_test = ws.users.input_Array[4].split(' ')
      if(arr_test[0] == 'когда' &&
         arr_test[1] == 'я' &&
         arr_test[2] == 'последний' &&
         arr_test[3] == 'раз' 
        ){
        if(arr_test.length == 6){
          console.log('WWWWW')
          arr_test.splice(0,1)
          arr_test.splice(0,1)
          arr_test.splice(0,1)
          arr_test.splice(0,1)
          let x_name = arr_test.join('_')
          console.log(x_name)
          strx = polival_kystu.then_event_bin(ws,x_name,'последний раз , '+arr_test[0]+' '+arr_test[1]+' ',ws)
          ws.send(strx);strx = '';
        }
      }
    }
    /*

    if(strx.includes('pa0') &&
       strx.includes('pa1') &&
       strx.includes('pa2') &&
       strx.includes('pa3')){
      console.log(ws.users.name+'<------------------------1')
      strx = polival_kystu.when_watered(ws,'Поливал_кусты','Последний раз поливал ')
      ws.send(strx);strx = '';
    }else
      if(strx.includes('pb0') &&
         strx.includes('pb1') &&
         strx.includes('pb2') &&
         strx.includes('pb3')){
        strx = polival_kystu.poured_flowers(ws,'Поливал_кусты','Молодец, за всё время, поливал цветы уже ',ws)
        ws.send(strx);strx = '';
      }else
        if(strx.includes('za0') &&
           strx.includes('za1') &&
           strx.includes('za2') &&
           strx.includes('za3')){
          strx = polival_kystu.when_watered(ws,'Когда_чистил_зубы','Последний раз чистил зубы ')
          ws.send(strx);strx = '';
        }else
          if(strx.includes('zb0') &&
             strx.includes('zb1') &&
             strx.includes('zb2') &&
             strx.includes('zb3')){
            strx = polival_kystu.poured_flowers(ws,'Когда_чистил_зубы','Молодец, за всё время, чистил зубы уже ',ws)
            ws.send(strx);strx = '';
          }
*/
    /*

  ///////////////////////////////////////////////////////////////////////////////
  //                  МУЗЫКАЛЬНЫЙ ПЛЕЕР
  //////////////////////////////////////////////////////////////////////////////
  */
    if(strx.includes('mb0') &&
       strx.includes('mb1') &&
       strx.includes('mb2') &&
       strx.includes('mb3')){
      strx = aska_DJ.stop(ws)
    }else if(strx.includes('ma0') &&
             strx.includes('ma1') &&
             strx.includes('ma2') &&
             strx.includes('ma3') &&
             strx.includes('ma4')){
      strx = aska_DJ.start(ws,'new')
    }
    /////////////////////////////////////////////////////////////////////////
    if(strx.includes('mc0') &&
       strx.includes('mc1') &&
       strx.includes('mc2') &&
       strx.includes('mc3')){
      strx = aska_DJ.next(ws,2,true)
    }
    if(strx.includes('md0') &&
       strx.includes('md1') &&
       strx.includes('md2') &&
       strx.includes('md3')){
      let axc = ws.users.input_Array[4]
      strx = aska_DJ.searchTrack(ws,axc)
    }
    if(strx.includes('me0') &&
       strx.includes('me1') &&
       strx.includes('me2') &&
       strx.includes('me3')){
      strx = aska_DJ.volume('+',0.2)
    }else if(strx.includes('mf0') &&
             strx.includes('mf1') &&
             strx.includes('mf2') &&
             strx.includes('mf3')){
      strx = aska_DJ.volume('+',0.4)
    }
    if(strx.includes('mg0') &&
       strx.includes('mg1') &&
       strx.includes('mg2') &&
       strx.includes('mg3')){
      strx = aska_DJ.volume('-',0.2)
    }else if(strx.includes('mi0') &&
             strx.includes('mi1') &&
             strx.includes('mi2') &&
             strx.includes('mi3')){
      strx = aska_DJ.volume('-',0.4)
    }

    if(strx.includes('mu0') &&
       strx.includes('mu1') &&
       strx.includes('mu2') &&
       strx.includes('mu3')){
      strx = aska_DJ.next(ws,-5,false)
    }
    if(strx.includes('mk0') &&
       strx.includes('mk1') &&
       strx.includes('mk2') &&
       strx.includes('mk3')){
      strx = aska_DJ.next(ws,5,true)
    }
    ////////////////////////////////////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////
    //
    // 
    //  
    //   

    //      
    //       
    //        
    //



    if(strx.includes('na0') &&
       strx.includes('na1') &&
       strx.includes('na2') &&
       strx.includes('na3') &&
       strx.includes('na4')){
      strx = quest.add_quest(ws)
    }

    if(strx.includes('nb0') &&
       strx.includes('nb1') &&
       strx.includes('nb2') &&
       strx.includes('nb3')){
      let effects = 'что с ней сделать?'
      strx = quest.list_quest(effects,ws)
    }
    if(strx.includes('nc0') &&
       strx.includes('nc1') &&
       strx.includes('nc2') &&
       strx.includes('nc3') &&
       strx.includes('nc4')){
      strx = quest.start_quest(ws)
    }

    /*
  if(text_do.includes('что мне делать')){
    //let arrx = jetpack.read('JSON/todo.json','json');
    //strx = quest.start_quest(arrx.length-1,ws)
    strx = NNQ.aska_give_quest((this_real_time()),ws)
  }
  if(text_do.includes('обучение')){
    strx = NNQ.aska_learn_quest()
  }
  */

    if(strx.includes('nd0') &&
       strx.includes('nd1') &&
       strx.includes('nd2') &&
       strx.includes('nd3') &&
       strx.includes('nd4')){
      strx = quest.finish_quest(ws)
    }
    /*
  if(strx.includes('ne0') &&
     strx.includes('ne1') &&
     strx.includes('ne2') &&
     strx.includes('ne3') &&
     strx.includes('ne4') && x_x_access){
    strx = quest.finished_quest(ws)
  }
  */
    if(strx.includes('nf0') &&
       strx.includes('nf1') &&
       strx.includes('nf2') &&
       strx.includes('nf3')){
      strx = quest.ongoing(ws)
    }

    if(strx.includes('da0') &&
       strx.includes('da1') &&
       strx.includes('da2') &&
       strx.includes('da3') &&
       strx.includes('da4')){
      let text0 = ['самое интересное что ты сделал позавчера',
                   'made_yesterday()',
                   'а что интересного было вчера',
                   'remind()',
                   'а вчера ты планировал сделать',
                   'wanted_yesterday()',
                   'что собираешься делать сегодня',
                   'dreamsCome_true()',
                   'ясно, давай, всё получится, позже ты будешь это вспоминать',
                   'похоже всё работает, я очень рада что могу быть тебе полезной']

      strx = quest.listener_of_end(text0,ws)
    }

    /*
  //  if(text_do.includes('вчера')){
  //    quest.made_yesterday(ws)
  ///  }
  // if(text_do.includes('список дел')){
  //    strx = 'Что ты собираешься делать сегодня?'
  //    let answer = 'всё'
  //    let effects = 'ясно, давай, всё получится, позже ты будешь это вспоминать'
  //    quest.dreamsCome_true(answer,effects,ws)
  //  }
  //  if(text_do.includes('хотел сделать')){
  //    quest.wanted_yesterday(ws)
  //  }  SYSTEM:Shutup


  if(strx.includes('потихоньку')){
    let htmlx = `SYSTEM<video class="player__video viewer" src="tracks/video.mp4" autoplay></video>`
    let stopin = `SYSTEM<p>Like</p>`;
    //nervMessage(htmlx,ws);
    setTimeout(()=>{
      //nervMessage(stopin,ws)
    },5500)
  }
*/

    /*  if(windowManager.sharedData.fetch('buffer_text').includes('покажи')){
    let htmlx = `SYSTEM<iframe src="//coub.com/embed/t26on?muted=false&autostart=true&originalSize=true&startWithHD=true" allowfullscreen="false" frameborder="0" width="1280" height="720"></iframe>`
    let stopin = `SYSTEM<p>Like</p>`;
    //nervMessage(htmlx,ws);
    setTimeout(()=>{
      //nervMessage(stopin,ws)
    },15500)
 }*/ 
    /*
  if(windowManager.sharedData.fetch('buffer_text').includes('видео')){
    let htmlx = `EVALlet contentt = document.querySelector('.info');
contentt.innerHTML = '<video class="player__video viewer" src="amv/00.mp4" autoplay></video>';
let video = document.querySelector('.player__video');
video.webkitRequestFullscreen();
video.volume = localStorage.audioVolume;
video.currentTime = (3*60)+24;
`
    let stopin = `SYSTEM<p>Like</p>`;
    nervMessage(htmlx,ws);
    setTimeout(()=>{
      nervMessage(stopin,ws)
    },65500)
  }
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  */
    if(ws.users.input_Array[4].includes('покажи график')){
      let subtext = ws.users.input_Array[4]
      // let adress = subtext.substring(14,subtext.length)
      //adress = adress.split(' ').join('_')
      ///////////////// 1 Задание ////// берем адреса всех не стринговых
      let arr = jetpack.list('./JSON/data/'+ws.users.name+'/graphics_data')
      let arr_i = []

      arr.forEach((v)=>{
        let arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+v,'json');
        if(_.isString(arr_json[0])){
          console.log(v)
        }else{
          v = v.substring(0,v.length-5)
          arr_i.push(v)
        }
      })
      console.log('adress '+arr_i)
      strx = ""
      ///////////////// 2 Задание ////// фор ич для масиива адресов
      let arr_array = []
      arr_i.forEach((v)=>{
        arr_array.push(jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+v+'.json','text'))
      })


      //let arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+adress+'.json','json');





      let arr_grafics = ''
      arr_grafics += `EVAL`;

      arr_i.forEach((v,i)=>{
        arr_grafics += ` var arr_${i} = ${arr_array[i]};`;
      })

      // let yuii = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+arr_i[3]+'.json','json')
      // console.log(yuii)
      //arr_grafics += `var arr_n = ${yuii}`;
      ws.send(arr_grafics);

      let dat_data = ''
      let lcolor = `window.chartColors.red`
      arr_i.forEach((v,i)=>{
        if(i == 1){lcolor = `localStorage.line_color_0`}
        if(i == 2){lcolor = `localStorage.line_color_1`}
        if(i == 3){lcolor = `localStorage.line_color_2`}
        if(i == 4){lcolor = `localStorage.line_color_3`}
        if(i == 5){lcolor = `localStorage.line_color_4`}
        if(i == 6){lcolor = `localStorage.line_color_5`}
        if(i == 7){lcolor = `localStorage.line_color_6`}
        if(i == 8){lcolor = `localStorage.line_color_7`}
        if(i == 9){lcolor = `localStorage.line_color_8`}
        if(i == 10){lcolor = `localStorage.line_color_9`}
        if(i == 11){lcolor = `localStorage.line_color_10`}
        if(i == 12){lcolor = `localStorage.line_color_11`}
        dat_data+=`{
label: "${v}",
backgroundColor: 'rgb(3, 3, 3)',
borderColor: ${lcolor},
fill: false,
data: preparing_data(arr_${i})
},`
      })
      dat_data = dat_data.substring(0,dat_data.length-1)
      console.log(dat_data)
      //jetpack.read('F:/ajr/JSON/'+adress+'.json','json');

      let htmlx = `EVALconst this_real_time = function(){
var objData = new Date();
var year = objData.getFullYear()
var month = objData.getMonth();
var date = objData.getDate();
var hours = objData.getHours();
var minutes = objData.getMinutes();
return [year,month+1,date,hours,minutes]
}
if(!localStorage.line_color_0){
localStorage.line_color_0 = 'rgb(75, 192, 192)'
localStorage.line_color_1 = 'rgb(192, 75, 192)'
localStorage.line_color_2 = 'rgb(192, 192, 75)'
localStorage.line_color_3 = 'rgb(75, 75, 192)'
localStorage.line_color_4 = 'rgb(75, 192, 75)'
localStorage.line_color_5 = 'rgb(192, 75, 75)'
}


const calc_time_difference = function(arr_time_x,arr_real_time){


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
let v1 = int_day_in_month(arr_time_x[1])
let v0 = int_day_in_year(arr_time_x[0])
let the_magic_begin = (v0*24*60)+(v1*24*60)+(arr_time_x[2]*24*60)+(arr_time_x[3]*60)+arr_time_x[4];
v1 = int_day_in_month(arr_real_time[1])
v0 = int_day_in_year(arr_real_time[0])
var symaDate = (v0*24*60)+(v1*24*60)+(arr_real_time[2]*24*60)+(arr_real_time[3]*60)+arr_real_time[4]
symaDate = symaDate - the_magic_begin;
return symaDate
}



//////////////////////////////////////////////////////////////////////
const preparing_data = function(arr){
let arr_corect = []
arr.forEach((v)=>arr_corect.push(v[1]+'/'+v[2]+'/'+v[0]+' '+v[3]+':'+v[4]))
console.log(arr_corect)

let arr_x = []
for(i=0;i<arr.length-1;i++){
arr_x.push(calc_time_difference(arr[i],arr[i+1]))
}
// arr_x.push(calc_time_difference(arr[arr_json.length-1],this_real_time()));
console.log(arr_x);


let arr_with_objects = []
arr_corect.forEach((v,i)=>{
let obj_test = {
x: v,
y: arr_x[i-1]
}
arr_with_objects.push(obj_test)
})
console.log(arr_with_objects)
return arr_with_objects
}



let time_to_string = ''
let lasttime = this_real_time()
time_to_string = lasttime[1]+'/'+lasttime[2]+'/'+lasttime[0]+' '+lasttime[3]+':'+lasttime[4]



var timeFormat = 'MM/DD/YYYY HH:mm';
function newDate(days) {
return moment().add(days, 'd').toDate();
}
function newDateString(days) {
return moment().add(days, 'd').format(timeFormat);
}
function newTimestamp(days) {
return moment().add(days, 'd').unix();
}
console.log(newDateString(15))
var color = Chart.helpers.color;
var config = {
type: 'line',
data: {
datasets: [${dat_data}]
},
options: {
title:{
text: "Chart.js Time Scale"
},
scales: {
xAxes: [{
type: "time",
time: {
format: timeFormat,
max:time_to_string,
tooltipFormat: 'll HH:mm'
},
scaleLabel: {
display: true,
labelString: 'Date'
}
}, ],
yAxes: [{
scaleLabel: {
display: true,
labelString: 'value',
}
}]
},
}
};

var ctx2 = document.getElementById("myChart").getContext("2d");
window.myLine = new Chart(ctx2, config);

var colorNames = Object.keys(window.chartColors);

// window.myLine.update();

`;
        ws.send(htmlx);
      }



        /*






  ////////////////////////// ВОПРОСЫ ОТВЕТЫ ////////////////////////////////// 
  if(strx.includes('доброе') && ws.x_user == 'HydraFire'){
    let ask = []
    quest.question('ты выспался?','нет','очень жаль, рекомендую послушать музыку',ws)
  }

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////// Долгий расказ и вопрос полсе /////////////////////
  //////////////////////////////////////////////////////////////////////////////
  if(strx.includes('вопрос с ответом')){

    strx = `Объект HTML5 video содержит методы, свойства и события для управления воспроизведением из JavaScript.
Как сделать свои кнопки?
Элемент HTML5 video содержит собственные встроенные элементы управления для воспроизведения, приостановки и поиска в видеозаписи. В следующем примере методы play и pause используются для начала`
    //listener_of_end(ws)
    let interval_01
    interval_01 = setInterval(()=>{
      if(windowManager.sharedData.fetch('SHUT_UP') == 'false'){
        clearInterval(interval_01)
        let interval_02
        interval_02 = setInterval(()=>{
          if(windowManager.sharedData.fetch('SHUT_UP') == 'true'){
            quest.question('была ли эта информация тебе полезна?','нет','пошол ты в пизду',ws)
            clearInterval(interval_02)
          }
        },1000)
      }
    },1000)
  }

*/
        if(ws.users.input_Array[4].includes('удали последний элемент массива')){
          strx = NNQ.aska_learn_delete(ws)
        }
      }
        return strx
      }