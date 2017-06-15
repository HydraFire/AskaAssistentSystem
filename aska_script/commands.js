
const jetpack = require('fs-jetpack');
//const windowManager = require('electron-window-manager');
/*
const webSearch = require('./aska_script/webSearch').webSearch;
///////////
const quest = require('./aska_script/quest');
const NNQ = require('./aska_script/NN_quest');
const NN_quest_grafics = require('./aska_script/NN_quest_grafics');
const memory_fun = require('./aska_script/memory_fun');
const aska_DJ = require('./aska_script/aska_DJ');
//////////
const webSearchYouTube = require('./aska_script/webSearchYouTube');
/////////
const webPerexod = require('./aska_script/webSearch').webPerexod;
const nervMessage = require('./aska_script/webSearch').nervMessage;
*/
const polival_kystu = require('./polival_kystu');
const aska_DJ = require('./aska_DJ');
//const when_watered = require('./aska_script/polival_kystu').when_watered;
//const poured_flowers = require('./aska_script/polival_kystu').poured_flowers;
//const this_real_time = require('./aska_script/polival_kystu').this_real_time;

exports.commands = function(strx,ws){

  //////////////////////////////// USERS /////////////////////////////////////
 // if(windowManager.sharedData.fetch('buffer_text').includes('HydraFire')){
 //   strx = 'Хозяин, желаешь чего?'
 // }
 // if(windowManager.sharedData.fetch('buffer_text').includes('unidentified')){
//    strx = 'Внимание, ваш ip адрес, не закреплен, ни за одним, из пользователей, обратитесь к анминистратору'
  //}
/*
  //////////////////////////////////////////////////////////////////////////
  let arr_max = jetpack.read('C:/Users/NERV/Desktop/AskaWebServer/JSON/five_buffer.json','json')
  arr_max.push(windowManager.sharedData.fetch('buffer_text'))
  jetpack.write('C:/Users/NERV/Desktop/AskaWebServer/JSON/five_buffer.json',arr_max)
  ///////////////////////////////////////////////////////////////////////////////
  if(windowManager.sharedData.fetch('buffer_text').includes('запомни')){
    let ask = arr_max[arr_max.length-3]
    let answer = arr_max[arr_max.length-2]
    strx = memory_fun.save(ask,answer,ws)
  }
  if(windowManager.sharedData.fetch('buffer_text').includes('подума')
   ){
    strx = NNQ.aska_learn_quest_main()
  }
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
  if(windowManager.sharedData.fetch('buffer_text').includes('DATA_JSON')){
    let str = windowManager.sharedData.fetch('buffer_text');
    let n = parseFloat(str.substring(10,str.length));
    let all_file = jetpack.list('C:/Users/ASKA/Desktop/NERV Project/make-cake/public/a_models_configs');
    if(n > all_file.length){n = n%all_file.length}
    let arr_scales = jetpack.read('C:/Users/ASKA/Desktop/NERV Project/make-cake/public/a_models_configs/'+all_file[n],'json')
    strx = 'DATA_JSON'+ JSON.stringify(arr_scales);
  }
  if(windowManager.sharedData.fetch('buffer_text').includes('SAVE_JSON')){
    let str = windowManager.sharedData.fetch('buffer_text');
    let hjk = str.search('ASKA');
    let file_number = parseFloat(str.substring(10,hjk))
    let hui = str.substring(hjk+4,str.length)
    let arrn = JSON.parse(hui)
    let all_file = jetpack.list('C:/Users/ASKA/Desktop/NERV Project/make-cake/public/a_models_configs');
    if(file_number < all_file.length){
      //n = n%all_file.length
      jetpack.write('C:/Users/ASKA/Desktop/NERV Project/make-cake/public/a_models_configs/'+all_file[file_number],arrn)
    }else{
      jetpack.write('C:/Users/ASKA/Desktop/NERV Project/make-cake/public/a_models_configs/eva_'+all_file.length,arrn)
    }

    strx = 'Сохранено'
  }
  ///////////////////////////////////////////////////////////////////////////////
  */
  if(global.aska_state_00.includes('файл')){
    let htmlx = ''
    let arr = jetpack.list('./public/files')
    arr.forEach(v=>htmlx+=`<p><a href="files/${v}" download>${v}</a></p>`)
    strx = 'SYSTEM'+htmlx
  }
  if(global.aska_state_00.includes('папка')){
    let htmlx = ''
    let arr = jetpack.list('./public/files/music')
    arr.forEach((v)=>{
      if(global.playing_music == v){
      htmlx+=`<p><a style="color:red;" href="files/music/${v}" download>${v}</a></p>`
      }else{
      htmlx+=`<p><a href="files/music/${v}" download>${v}</a></p>`
      }
    })
    strx = 'SYSTEM'+htmlx
  }
  
  console.log('работает0')
  if(strx.includes('когда поливал') && ws.x_user == 'HydraFire'){
    console.log('работает')
    strx = polival_kystu.when_watered('Поливал_кусты','Последний раз поливал ')
    console.log('работает2')
  }else
    if(strx.includes('полил') && ws.x_user == 'HydraFire'){
      strx = polival_kystu.poured_flowers('Поливал_кусты','Молодец, за всё время, поливал цветы уже ',ws)
    }else
      if(strx.includes('когда чистил') && ws.x_user == 'HydraFire'){
        strx = polival_kystu.when_watered('Когда_чистил_зубы','Последний раз чистил зубы ')
      }else
        if(strx.includes('почистил зубы') && ws.x_user == 'HydraFire'){
          strx = polival_kystu.poured_flowers('Когда_чистил_зубы','Молодец, за всё время, чистил зубы уже ',ws)
        }
/*

  ////////////////ПЕРЕЙТИ ПО СЫЛКЕ И ПРОЧИТАТЬ С ЛЮБОГО ТЕГА///////////////////
  if(strx.includes('температура киев')){
    let link = 'https://www.meteoprog.ua/ru/weather/Kyiv'
    let webclass = '.temperature_value'
    let coments = ' градусов тепла'
    strx = webSearch(coments,link,webclass,ws)
  }
  if(windowManager.sharedData.fetch('buffer_text').includes('берсерк')){
    let link = 'http://online.anidub.com/anime_tv/anime_ongoing/10139-berserk-tv-3-berserk-tv-3-01-iz-13.html'
    let webclass = '.titlfull'
    let coments = ' '
    strx = webSearch(coments,link,webclass,ws)
  }
  if(windowManager.sharedData.fetch('buffer_text').includes('комментарии')){
    let link = 'https://www.youtube.com/watch?v=Xe20_fMmwOs&t=216s'
    let webclass = '.comment-renderer-text-content'
    let coments = ' последний коментарий'
    strx = webSearch(coments,link,webclass,ws)
  }
  if(strx.includes('новые сообщения') && ws.x_user == 'HydraFire'){
    let link = 'https://vk.com/feed'
    let webclass = '.left_count'
    let coments = ' новых сообщений'
    strx = webSearch(coments,link,webclass,ws)
  }

  if(strx.includes('последнее сообщение') && ws.x_user == 'HydraFire'){
    let link = 'https://vk.com/im'
    let webclass = '._dialog_body'
    let coments = ' новых сообщений'
    strx = webSearch(coments,link,webclass,ws)
  }

  ///////////////////////////////////////////////////////////////////////////////
  //                  МУЗЫКАЛЬНЫЙ ПЛЕЕР
  //////////////////////////////////////////////////////////////////////////////
  */
  let first_buffer = global.aska_state_00
  if(first_buffer.includes('выключи музыку')||
     first_buffer.includes('выключи')
    ){
    strx = aska_DJ.stop()
  }else if(first_buffer.includes('включи музыку')||
           first_buffer.includes('музыку включи')||
           first_buffer.includes('музыка')
          ){strx = aska_DJ.start('new')}
  /////////////////////////////////////////////////////////////////////////
  if(first_buffer.includes('следующий трек')||
     first_buffer.includes('следующий')||
     first_buffer.includes('следующая песня')||
     first_buffer.includes('следующая композиция')
    ){
    strx = aska_DJ.next(2,true)
  }
  if(first_buffer.includes('найти трек')||
     first_buffer.includes('найди трек')
    ){
    strx = aska_DJ.searchTrack(first_buffer)
  }
  if(first_buffer.includes('немного громче')){
    strx = aska_DJ.volume('+',0.2)
  }else if(first_buffer.includes('громче')){
    strx = aska_DJ.volume('+',0.4)
  }
  if(first_buffer.includes('немного тише')){
    strx = aska_DJ.volume('-',0.2)
  }else if(first_buffer.includes('тише')){
    strx = aska_DJ.volume('-',0.4)
  }

  if(first_buffer.includes('очень нравится') && ws.x_user == 'HydraFire'){
    strx = aska_DJ.next(-5,false)
  }
  if(first_buffer.includes('надоело') && ws.x_user == 'HydraFire'){
    strx = aska_DJ.next(5,true)
  }
  /*
  ///////////////////////////////////////////////////////////////////
  ////ПЕРЕЙТИ ПОСЫЛКЕ НАПИСАТЬ ЧТОТО В ПОИСК И ВЗЯТЬ РЕЗУЛЬТАТ////////////////
  ///////////////////////////////////////////////////////////////////////
  if(windowManager.sharedData.fetch('buffer_text').includes('что такое')){
    let arr = jetpack.read('buffer_text.json','.txt')
    let coments = arr.substring(10,arr.length)
    let link = 'https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0'
    let click = [750,150]
    let webclass = '#searchInput'
    let webclass2 = '#mw-content-text'

    strx = webPerexod(coments,link,click,webclass,webclass2,ws)
  }
  if(windowManager.sharedData.fetch('buffer_text').includes('поиск')){
    let arr = jetpack.read('buffer_text.json','.txt')
    let coments = arr.substring(6,arr.length)
    let link = 'https://google.com.ua'
    let click = [400,480]
    let webclass = '#lst-ib'
    let webclass2 = '.r'

    strx = webPerexod(coments,link,click,webclass,webclass2,ws)
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
  let text_do = windowManager.sharedData.fetch('buffer_text') 

  if(text_do.includes('новое задание') && ws.x_user == 'HydraFire'){
    strx = quest.add_quest(ws)
  }

  if(text_do.includes('список заданий') && ws.x_user == 'HydraFire'){
    let answer = jetpack.read('JSON/todo.json','json');
    let effects = 'что мне с ним сзделать?'
    strx = quest.list_quest('none',answer,effects,ws)
  }
  if(text_do.includes('дай мне задание') && ws.x_user == 'HydraFire'){
    let arrx = jetpack.read('JSON/todo.json','json');
    strx = quest.start_quest(arrx.length-1,ws)
  }
  if(text_do.includes('что мне делать') && ws.x_user == 'HydraFire'){
    //let arrx = jetpack.read('JSON/todo.json','json');
    //strx = quest.start_quest(arrx.length-1,ws)
    strx = NNQ.aska_give_quest((this_real_time()),ws)
  }
  if(text_do.includes('обучение') && ws.x_user == 'HydraFire'){
    strx = NNQ.aska_learn_quest()
  }
  if(text_do.includes('задание выполнено') && ws.x_user == 'HydraFire'){
    strx = quest.finish_quest(ws)
  }
  if(text_do.includes('выполненные задания') && ws.x_user == 'HydraFire'){
    strx = quest.finished_quest(ws)
  }
  if(text_do.includes('текущее задание') && ws.x_user == 'HydraFire' ||
     text_do.includes('текущее задания') && ws.x_user == 'HydraFire' ||
     text_do.includes('текущая задание') && ws.x_user == 'HydraFire' 
    ){
    strx = quest.ongoing(ws)
  }

  if(text_do.includes('книга') && ws.x_user == 'HydraFire'){
    let text0 = ['Доброе утро хозяин, самое интересное что ты сделал позавчера',
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

*/
  if(strx.includes('потихоньку')){
    let htmlx = `SYSTEM<video class="player__video viewer" src="tracks/video.mp4" autoplay></video>`
    let stopin = `SYSTEM<p>Like</p>`;
    //nervMessage(htmlx,ws);
    setTimeout(()=>{
      //nervMessage(stopin,ws)
    },5500)
  }


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
  if(windowManager.sharedData.fetch('buffer_text').includes('график')){
    let adress = 'Когда_чистил_зубы';
    let arr_json = jetpack.read('F:/ajr/JSON/'+adress+'.json','txt');

    arr_json = `EVALvar arr_json = ${arr_json};`;
    nervMessage(arr_json,ws);
    //jetpack.read('F:/ajr/JSON/'+adress+'.json','json');

    let htmlx = `EVAL
const this_real_time = function(){
var objData = new Date();
var year = objData.getFullYear()
var month = objData.getMonth();
var date = objData.getDate();
var hours = objData.getHours();
var minutes = objData.getMinutes();
return [year,month+1,date,hours,minutes]
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
const grafics = function(adress,v){
if(arr_json == undefined || arr_json == ""){
alert('файл '+adress+' ненайден')
}else{
let arr_x = []
for(i=0;i<arr_json.length-1;i++){
arr_x.push(calc_time_difference(arr_json[i],arr_json[i+1]))
}
arr_x.push(calc_time_difference(arr_json[arr_json.length-1],this_real_time()));
console.log(arr_x);
if(v=='-'){arr_x = arr_x.map(v=>-v)}
var data = {
labels: arr_x,
datasets: [
{
label: adress,
fill: true,
lineTension: 0.1,// угол сглаживания линии
backgroundColor: "rgba(150,60,60,0.5)",// цвет столбцов
borderColor: "rgba(192,75,75,1)",// цвет линии
borderCapStyle: 'butt',
borderDash: [],
borderDashOffset: 0.0,
borderJoinStyle: 'miter',
pointBorderColor: "rgba(192,75,75,1)",// цвет точек
pointBackgroundColor: "#111",// цвет в центре точки
pointBorderWidth: 1,// толшина линии на круге
pointHoverRadius: 1,
pointHoverBackgroundColor: "rgba(75,192,192,1)",
pointHoverBorderColor: "rgba(200,200,200,0.1)",
pointHoverBorderWidth: 10,
pointRadius: 10,// размер точек
pointHitRadius: 10,
data: arr_x,
spanGaps: false
}
]
};
var options2 = {
title: {
display: true,
text: adress,
padding: 80
},
scales: {
yAxes: [{
stacked: true
}]
}
}

//var Chart = require('F:/ajr/aspirin/node_modules/chart.js/src/chart.js')
var ctx2 = document.querySelector('#myChart')
ctx2.width = 1920;
ctx2.height = 600;
var myLineChart = new Chart(ctx2, {
type: 'line',
data: data,
options: options2
});
}
}
grafics('Поливал_кусты',10)
`;
    nervMessage(htmlx,ws);
  }







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
  return strx
}