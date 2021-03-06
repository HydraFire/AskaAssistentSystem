
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
const napominalka = require('./napominalka');
const sendToAska = require('../main').sendToAska;
const text_analitic = require('./text_analitic');
const one_time_napominanie = require('./one_time_napominanie')
//const ask = require('./ask');
//const when_watered = require('./aska_script/polival_kystu').when_watered;
//const poured_flowers = require('./aska_script/polival_kystu').poured_flowers;
//const this_real_time = require('./aska_script/polival_kystu').this_real_time;


const run = function(strx,ws){
  console.log(global[ws.users.name])
  ws.users.input_Array[4] = strx
  strx = ''
  console.log('Ответ нейроной сети |'+strx+'|')
  if(ws.users.all_thoughts.length == 0){
    ///////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    
    if(ws.users.input_Array[4].includes('нейронная сеть')||
      ws.users.input_Array[4].includes('переключить в режим нейронной сети')){
     ws.users.nn = true
     strx = 'переключение в режим машинного интеллекта'
    }
    
    
    if(ws.users.input_Array[4].includes('заткнись') ||
       ws.users.input_Array[4].includes('помолчи')){
      ws.users.attention = 'NO LISTEN'
      ws.send('EVALwindow.color_aska_h = 20;aska("режим ожидания")')
      strx = ''
    }
    
    if(ws.users.input_Array[4] == 'зарегистрировать новую команду'){
     strx = text_analitic.new_command(ws)
     
    }
    if(ws.users.input_Array[4].includes('прочитай')){
      ws.send('EVALreadClipboard()')
      strx = ''
    }
    if(ws.users.input_Array[4].includes('переведи')){
      ws.send('EVALreadClipboard_and_translate()')
      strx = ''
    }
    
    if(ws.users.input_Array[4].includes('включи этот трек')){
      let zty = ws.users.input_Array[4]
      zty = zty.substring(17,zty.length)
      if(zty != ''){
      strx = aska_DJ.start(ws,'none',zty,'some')
      }else{
      strx = 'нужно указать полное имя файла'
      }
      
    }
    if(ws.users.input_Array[4].includes('начиная с этого момента')){
      let text = ws.users.input_Array[4]
      let textik = 'начиная с этого момента'
      aska_DJ.fron_this_moment(ws,text,textik)
      strx = ''
    }
    if(ws.users.input_Array[4].includes('заканчивай на этом')){
      let text = ws.users.input_Array[4]
      let textik = 'заканчивай на этом'
      aska_DJ.to_this_moment(ws,text,textik)
      strx = ''
    }
    if(ws.users.input_Array[4] == 'удали видео с этого трека'){
      //let text = ws.users.input_Array[4]
      //let textik = 'заканчивай на этом'
      aska_DJ.delete_video_link(ws)
      strx = ''
    }
    if(ws.users.input_Array[4] == 'удали этот файл видео'){
      //let text = ws.users.input_Array[4]
      //let textik = 'заканчивай на этом'
      console.log('HO')
      aska_DJ.delete_video(ws)
      strx = ''
    }
    if(ws.users.input_Array[4] == 'н**** удали этот трек'||
       ws.users.input_Array[4] == 'н**** удалил этот трек'||
       ws.users.input_Array[4] == 'н**** выдали этот трек'||
       ws.users.input_Array[4] == 'удали н**** этот трек'||
       ws.users.input_Array[4] == 'настя удали этот трек'
      ){
      //let text = ws.users.input_Array[4]
      //let textik = 'заканчивай на этом'
      aska_DJ.delete_audio(ws)
      strx = ''
    }
    if(ws.users.input_Array[4] == 'повтори предыдущий трек'||
       ws.users.input_Array[4] == 'включи предыдущий трек'){
      //let text = ws.users.input_Array[4]
      //let textik = 'заканчивай на этом'
      aska_DJ.replay_last(ws)
      strx = ''
    }
    if(ws.users.input_Array[4] == 'список всех команд'){
      //let text = ws.users.input_Array[4]
      //let textik = 'заканчивай на этом'
      let htcode = 'SYSTEM'
      htcode+= `<button onclick="socket.send('н**** выдали этот трек')">н**** выдали этот трек</button>
<button onclick="socket.send('последний ошибка которая у тебя была')">последний ошибка которая у тебя была</button>
<button onclick="socket.send('удали последний элемент массива')">удали последний элемент массива</button>
`
      ws.send(htcode)
      strx = ''
    }
    if(ws.users.input_Array[4] == 'последний ошибка которая у тебя было'||
       ws.users.input_Array[4] == 'последний ошибка которая у тебя была'||
       ws.users.input_Array[4] == 'последняя ошибка которую у тебя было'
      ){
      let arr_err = jetpack.read('./JSON/data/'+ws.users.name+'/err_arr.json','json')
      //let text = ws.users.input_Array[4]
      //let textik = 'заканчивай на этом'
      if(arr_err){
        strx = arr_err[arr_err.length-1]
      }else{
        strx = 'Пока небыло некаких ошибок'
      }
    }
    if(ws.users.input_Array[4] == 'давай дальше'){
      ws.users.new_par = true
      strx = 'Ладно'
    }
    if(ws.users.input_Array[4] == 'моя цель'){
      let dinamic = jetpack.read('./JSON/data/'+ws.users.name+'/dinamic.json','json')
      if(dinamic){
        strx = dinamic[0]
      }else{
        strx = ''
      }

    }
    if(ws.users.input_Array[4] == 'напоминание'){
      napominalka.check_time(ws)
      strx = ''
    }

    if(ws.users.input_Array[4] == 'привет'){
      let art = jetpack.read('./JSON/data/'+ws.users.name+'/program.json','json')
      if(art){
        let arrprog = art
        big(ws,arrprog)

        function big(ws,arrprog){

          ws.users.zet = setInterval(()=>{
            console.log('--> '+ws.users.all_thoughts.length+' <--')
            if(ws.users.all_thoughts.length == 0){
              console.log('- '+ws.users.silence+' -')
              console.log('- '+ws.users.aska_talks+' -')
              if(ws.users.new_par){
                if(ws.users.aska_talks){
                  if(ws.users.attention != 'NO LISTEN'){
                    arrprog = program(ws,arrprog)
                    console.log(arrprog)
                    if(arrprog.length == 0){
                      let objData = new Date();
                      let every_day = objData.getDate();
                      jetpack.write('./JSON/data/'+ws.users.name+'/every_day.json',every_day)
                      clearInterval(ws.users.zet)
                      console.log('end interval')
                    }
                  }
                }
              }
            }
          },2000)
        }


        function program(ws,arrprog){
          console.log('START NEW PROGRAM')
          if(arrprog[0].includes('ASKA')){
            arrprog[0] = arrprog[0].substring(4,arrprog[0].length)
            ws.send(arrprog[0])
            arrprog.splice(0,1)
          }else{
            ws.send('BOOMERANG'+arrprog[0])
            arrprog.splice(0,1)
            console.log(arrprog)
          }
          return arrprog
        }
      }else{
        strx = ''
      }
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
    if(ws.users.input_Array[4].includes('какая завтра будет погода')){
      let site = 'https://sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BA%D0%B8%D0%B5%D0%B2';
      let leng = 600
      let search_text = `<div class="main " id="bd2">`
      let start_text = ' '
      let plus_text = 'градусов'
      webSearch.post_to_str(ws,site,leng,search_text,true,plus_text,start_text)
      strx = ''
    }
    if(ws.users.input_Array[4].includes('температура на улице') ||
      ws.users.input_Array[4].includes('градусов на улице')){
      let site = 'http://meteo.ua/34/kiev';
      let leng = 3
      let search_text = `<div class="win_tmp">`
      let start_text = 'Сейчас на улице '
      let plus_text = 'градусов'
      webSearch.post_to_str(ws,site,leng,search_text,false,plus_text,start_text)
      strx = ''
    }
    
    if(ws.users.input_Array[4].includes('вакансии джаваскрипт') ||
      ws.users.input_Array[4].includes('вакансии java script')){
      let site = 'https://rabota.ua/jobsearch/vacancy_list?regionId=1&keyWords=JavaScript';
      let leng = 360
      let search_text = `<p style="cursor: pointer;" onclick="javascript: window.location =`
      let start_text = 'Последняя вакансия по веб разработке ,'
      let plus_text = ' и так далие.'
      webSearch.post_to_str(ws,site,leng,search_text,false,plus_text,start_text)
      strx = ''
    }
    if(ws.users.input_Array[4].includes('вакансии игры')){
      let site = 'https://rabota.ua/jobsearch/vacancy_list?regionId=1&keyWords=game';
      let leng = 360
      let start_text = 'Последняя вакансия по компютерным играм ,'
      let plus_text = ' и так далие.'
      let search_text = `<p style="cursor: pointer;" onclick="javascript: window.location =`
      webSearch.post_to_str(ws,site,leng,search_text,false,plus_text,start_text)
      strx = ''
    }
    ////////////////////////////////Сообщения между пользователями /////////
    if(ws.users.input_Array[4] == 'отправить сообщение'){
      ws.send('диктуй текст сообщения')
      let userM = ''
      if(ws.users.name == 'HydraFire'){
        userM = 'Ilya'
      }else{
        userM = 'HydraFire'
      }
      messenger.rec(ws,'всё','all_messege.json',userM)
      strx = ''
    }
    if(ws.users.input_Array[4] == 'мои сообщения'){
      if(ws.users.name == 'HydraFire'){
       ws.send('сообщение от пользователя Илья')
      }else{
       ws.send('сообщение от пользователя HydraFire')
      }
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

    if(ws.users.input_Array[4] == 'покажи список файлов на сервере'){
      let htmlx = ''
      let arr = jetpack.list('./public/users/'+ws.users.name)
      if(arr){
        arr.forEach(v=>htmlx+=`<p><a href="./users/${ws.users.name}/${v}" download>${v}</a></p>`)
        ws.send('SYSTEM'+htmlx)
        strx = ''
      }else{
        strx = 'еще нет некаких файлов, чтобы их добавить переташи файл на DropBox'
      }
    }
    if(ws.users.input_Array[4] == 'покажи файлы музыки'){
      let htmlx = ''
      let arr = jetpack.list('./public/users/'+ws.users.name+'/music')
      if(arr){
        arr.forEach((v)=>{
          if(ws.users.track == v){
            htmlx+=`<p><div class="tracks"><a style="color:red;" href="./users/${ws.users.name}/music/${v}" download>${v}</a><div class="track_button"><a onclick="play_music('${v}')">►</a> Pause Delete <a onclick="play_from('${v}')"> ☼</a><a onclick="play_to('${v}')"> ☼</a></div></p></div>`
          }else{
            htmlx+=`<p><div class="tracks"><a href="./users/${ws.users.name}/music/${v}" download>${v}</a><div class="track_button"><a onclick="play_music('${v}')">►</a> Pause Delete ☼ ☼</div></p></div>`
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
    if(ws.users.input_Array[4] == 'секрет'){
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
      ws.send('SYSTEM '+JSON.stringify(arr_test))
      if(arr_test[1] == 'не' &&
         arr_test[2] == 'хочу' &&
         arr_test.length >= 5
        ){
        arr_test.splice(0,1)
        arr_test.splice(0,1)
        arr_test.splice(0,1)
        
        let x_name = arr_test.join('_')
        ws.send('SYSTEM x_name = '+x_name)
        strx = polival_kystu.event_close(ws,x_name,'последний раз , '+arr_test[0]+' '+arr_test[1]+' ',ws)
        ws.send(strx);strx = 'SYSTEM x_name = '+x_name;
        
      }
    }
    if(ws.users.input_Array[4].charAt(0) == 'я'){
      let arr_test = ws.users.input_Array[4].split(' ')
      if(arr_test.length == 3||arr_test.length == 4){
        arr_test.splice(0,1)
        let x_name = arr_test.join('_')
        let textik = ["Ясно","Хорошо","Наконецьто","Просто ахуенно","Заебись","Отличьно","Замечательно","Умничька"]
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
    ////////////////////////////Зделай напоминание///////////////////////////
    console.log('*****************')
    console.log(ws.users.input_Array[4])
    if(ws.users.input_Array[4].charAt(0) == 'с'){
      let arr_test = ws.users.input_Array[4].split(' ')
      if(arr_test[0] == 'cделай' &&
         arr_test[1] == 'напоминание' &&
         arr_test[2] == 'на' &&
         arr_test.length == 3||arr_test.length == 4
        ){
        arr_test.splice(0,1)
        arr_test.splice(0,1)
        arr_test.splice(0,1)
        
        let x_time = arr_test.join(' ')
        console.log(x_time)
        strx = one_time_napominanie.create(ws,x_time)
        ws.send(strx);strx = '';
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
    if(ws.users.input_Array[4] == 'выключи музыку'){
      strx = aska_DJ.stop(ws)
    }else if(ws.users.input_Array[4] == 'включи музыку'){
      strx = aska_DJ.start(ws,'new')
    }
    /////////////////////////////////////////////////////////////////////////
    if(ws.users.input_Array[4] == 'следующий трек'){
      strx = aska_DJ.next(ws,2,true)
    }
    if(ws.users.input_Array[4].includes('найти трек')||ws.users.input_Array[4].includes('найди трек')){
      let axc = ws.users.input_Array[4]
      strx = aska_DJ.searchTrack(ws,axc)
    }
    if(ws.users.input_Array[4] == 'сделай немного громче'){
      strx = aska_DJ.volume('+',0.2)
    }else if(ws.users.input_Array[4] == 'сделай громче'){
      strx = aska_DJ.volume('+',0.4)
    }
    if(ws.users.input_Array[4] == 'сделай немного тише'){
      strx = aska_DJ.volume('-',0.2)
    }else if(ws.users.input_Array[4] == 'сделай тише'){
      strx = aska_DJ.volume('-',0.4)
    }

    if(ws.users.input_Array[4] == 'очень нравится этот трек'){
      strx = aska_DJ.next(ws,-5,false)
    }
    if(ws.users.input_Array[4] == 'мне надоел этот трек'){
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



    if(ws.users.input_Array[4] == 'новое задание'){
      strx = quest.add_quest(ws,'список заданий','список заданий')
    }

    if(ws.users.input_Array[4] == 'список заданий'){
      let arrx = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json');
      strx = quest.list_quest('список заданий','список заданий',arrx,ws)
    }
    if(ws.users.input_Array[4] == 'дай мне задание'){
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

    if(ws.users.input_Array[4] == 'задание выполнено'){
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
    if(ws.users.input_Array[4] == 'текущее задание'){
      strx = quest.ongoing(ws)
    }

    if(ws.users.input_Array[4] == 'электронный дневник'){
      let text0 = ['самое интересное',
                   'made_yesterday()',
                   'а что интересного было вчера',
                   'remind()',
                   'о чем думаешь?',
                   'wanted_yesterday()',
                   'что хочешь делать сегодня?',
                   'dreamsCome_true()',
                   'всё супер'
                   ]

      strx = quest.listener_of_end(text0,ws)
    }
   if(ws.users.input_Array[4].includes('дневник страница')){
     let text_v = 'дневник страница'
     text_v = text_v.length
     console.log(text_v)
     let index = ws.users.input_Array[4]
     index = index.substring(text_v,index.length)
     console.log(index)
     index = parseFloat(index)
     let text0 = ['made_yesterday()',
                  'вторая часть',
                  'wanted_yesterday()']
     strx = quest.listener_of_end(text0,ws,index)
     //strx = quest.made_yesterday('Dreams.json',ws,index)
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
      if(arr != null){
        let arr_i = []
        
        arr.forEach((v)=>{
          let arr_json = jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+v,'json');
          if(_.isString(arr_json[0])){
            //console.log(v)
          }else{
            v = v.substring(0,v.length-5)
            arr_i.push(v)
          }
        })
        //console.log('adress '+arr_i)
        strx = ""
        ///////////////// 2 Задание ////// фор ич для масиива адресов
        let arr_array = []
        let tty = jetpack.read('./JSON/data/'+ws.users.name+'/'+'NewAge28.json','json')
        console.log(tty)
        let zzz = []
        tty.forEach((v,i)=>{
          console.log(v[2]) 
          
          zzz[i] = v[2]
          
         //zzz.splice(zzz.length,1,v[1])
        })
        //zzz=zzz.toString()
        
        
        console.log(arr_array) 
        arr_i.forEach((v)=>{
          arr_array.push(jetpack.read('./JSON/data/'+ws.users.name+'/graphics_data/'+v+'.json','text'))
        })
        arr_i.push('дневник')
        var zxz = arr_i.length-1
        arr_array.push(JSON.stringify(zzz))
        console.log('///////////////////////////////////////') 
        console.log(arr_array) 

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
        let lcolor = `'rgb(192, 75, 75)'`;
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
ctx2.width = 1920
ctx2.height = 1080
window.myLine = new Chart(ctx2, config);

// window.myLine.update();

document.getElementById("myChart").onclick = function(evt){   
    var activePoints = window.myLine.getElementsAtEvent(evt);
	  if(activePoints.length > 0){
      var clickedElementindex = activePoints[0]["_index"];
	    var label = window.myLine.getDatasetAtEvent(evt);
		  console.log(clickedElementindex)
      console.log(label[clickedElementindex])
      console.log('${zxz}')
      if(label[clickedElementindex]._datasetIndex == ${zxz}){
        socket.send('дневник страница '+label[clickedElementindex]._index)
      }
   }  
}

`;
        ws.send(htmlx);
      }else{
        ws.send('нет статистики для построения графика');
      }
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
  sendToAska(strx,ws)
}
exports.run = run;