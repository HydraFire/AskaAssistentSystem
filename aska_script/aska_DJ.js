

const jetpack = require('fs-jetpack');

function get_new_tracks(ws){
  let aska_dj = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
  let track_list = jetpack.list('./public/users/'+ws.users.name+'/music')
  if(track_list){
    let arr_list = []
    track_list.forEach(v=>{if(v.includes('mp3')){arr_list.push(v)}})

    if(!aska_dj){
      aska_dj = []
      arr_list.forEach((v)=>{
        aska_dj.splice(aska_dj.length,1,[1,v,''])
      })
    }else{
      arr_list.forEach((v)=>{
        let per = 0
        aska_dj.forEach(t=>{
          if(v != t[1]){
            per +=1;
          }
          if(per == aska_dj.length){
            aska_dj.splice(aska_dj.length,1,[1,v])
          }
        })                        
      })
      jetpack.write('./JSON/data/'+ws.users.name+'/aska_dj.json',aska_dj)
    }
  }else{
    ws.send('Я невижу файлов музыки, ты должен их сперва залить')
  }
  return aska_dj
}
function track_played_plus1(ws,track,arr,num){
  let r
  arr.forEach((v,index)=>{
    if(v.indexOf(track) > 0){
      r = index
    }
  })
  let arr_statistic = parseFloat(arr[r][0])+num
  arr[r].splice(0,1,arr_statistic)
  arr.sort(function(a, b) {
    return a[0] - b[0];
  });
  jetpack.write('./JSON/data/'+ws.users.name+'/aska_dj.json',arr)
}
///////////////////////////////////////////////////////////////////////////
const replay_last = function(ws){
  if(ws.users.last_track.length > 1){

    let last_track = ''


    ws.users.last_track.forEach((v,i)=>{
      if(v == ws.users.track){
        last_track = ws.users.last_track[i-1]
      }
    })


    //ws.users.last_track[ws.users.last_track.length-2]
    console.log(last_track)
    ws.send(start(ws,'none',last_track))
  }else{
    ws.send('я забыла какой там был трек')
  }
}
exports.replay_last = replay_last;
///////////////////////////////////////////////////////////////////////////
const delete_audio = function(ws){
  let name_track = ws.users.track
  var aska_dj2 = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
  if(aska_dj2){
    aska_dj2.forEach((v,i)=>{
      if(v[1] == name_track){
        aska_dj2.splice(i,1)
      }
    })
  }
  jetpack.write('./JSON/data/'+ws.users.name+'/aska_dj.json',aska_dj2)
  ws.send(stop(ws))
  jetpack.remove('./public/users/'+ws.users.name+'/music/'+name_track);
  ws.send('Удалила трек '+ws.users.track)
} 
exports.delete_audio = delete_audio;
//////////////////////////////////////////////////////////////////////
const delete_video = function(ws){
  var aska_dj2 = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
  let video_file = ''
  if(aska_dj2){
    aska_dj2.forEach((v,i)=>{
      if(v[1] == ws.users.track){
        video_file = v[2]
      }
    })
  }
  if(video_file != ''){
    aska_dj2.forEach((v,i)=>{
      if(v[2] == video_file){
        v[2] = ''
      }
    })
    jetpack.write('./JSON/data/'+ws.users.name+'/aska_dj.json',aska_dj2)
    console.log(video_file)
    jetpack.remove('./public/users/'+ws.users.name+'/video/'+video_file);
  } 
}
exports.delete_video = delete_video;
/////////////////////////////////////////////////////////////////
const delete_video_link = function(ws){
  var aska_dj2 = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
  if(aska_dj2){
    aska_dj2.forEach((v,i)=>{
      if(v[1] == ws.users.track){
        v[2] = ""
      }
    })
  }
  jetpack.write('./JSON/data/'+ws.users.name+'/aska_dj.json',aska_dj2)
}
exports.delete_video_link = delete_video_link;
/////////////////////////////////////////////////////////////////
const fron_this_moment = function(ws,text,textik){
  text = text.substring(textik.length,text.length)
  text = parseFloat(text)
  console.log(text)
  console.log(text)
  console.log(text)
  var aska_dj2 = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
  let name_id = 's'
  if(aska_dj2){
    aska_dj2.forEach((v,i)=>{
      if(v[1] == ws.users.track){
        name_id = i
      }
    })
  }
  if(name_id != 's'){
    console.log(aska_dj2[name_id][3]+'    '+text)
    aska_dj2[name_id][3] = text
    console.log(aska_dj2[name_id][3]+'    '+text)
  }
  jetpack.write('./JSON/data/'+ws.users.name+'/aska_dj.json',aska_dj2)
  ws.send('хорошо, трек будет начинаться с '+text+' секунда')
}
exports.fron_this_moment = fron_this_moment;

const to_this_moment = function(ws,text,textik){
  text = text.substring(textik.length,text.length)
  text = parseFloat(text)
  console.log(text)
  console.log(text)
  console.log(text)
  var aska_dj2 = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
  let name_id = 's'
  if(aska_dj2){
    aska_dj2.forEach((v,i)=>{
      if(v[1] == ws.users.track){
        name_id = i
      }
    })
  }
  console.log(name_id)
  if(name_id != 's'){
    if(!aska_dj2[name_id][3]){
      aska_dj2[name_id][3] = 0
    }
    console.log(aska_dj2[name_id][4])
    aska_dj2[name_id][4] = text
    console.log(aska_dj2[name_id][4])
  }
  console.log(aska_dj2)
  jetpack.write('./JSON/data/'+ws.users.name+'/aska_dj.json',aska_dj2)
  ws.send('хорошо, трек будет заканчиваться на этом '+text+' секунда')
}
exports.to_this_moment = to_this_moment;

const add_video = function(ws){
  let name = ws.users.save_file_name
  let track = ws.users.track

  let aska_dj2 = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
  if(aska_dj2){
    aska_dj2.forEach((v)=>{
      console.log(v[1]+''+ws.users.track)
      if(v[1] == ws.users.track){
        v[2] = ws.users.save_file_name
      }
    })
    jetpack.write('./JSON/data/'+ws.users.name+'/aska_dj.json',aska_dj2)
  }

  console.log(name+' <-----> '+track)
}
exports.add_video = add_video;

const start = function(ws,par,track,from_what){
  console.log(track)
  let coub
  let start_sec
  let end_sec
  if(par == 'new'){
    var aska_dj2 = get_new_tracks(ws)
    }else{
      var aska_dj2 = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
      if(!aska_dj2){
        aska_dj2 = get_new_tracks(ws)
      }
    }
  if(aska_dj2){
    console.log(aska_dj2)
    let arr_x5 = []
    let sym = (aska_dj2.length/10)|0;
    for(i=0;i<sym;i++){
      arr_x5.push(aska_dj2[i])
    }
    if(aska_dj2.length > 10){
      let mathrandom = (Math.random()*arr_x5.length)|0
      if(track == undefined){
        track = arr_x5[mathrandom][1]
        start_sec = arr_x5[mathrandom][3]
        end_sec = arr_x5[mathrandom][4]
        ws.users.last_track.push(track)
        if(ws.users.last_track.length > 4){
          ws.users.last_track.splice(0,1)
        }
        console.log(ws.users.last_track)
        aska_dj2.forEach((v)=>{
          console.log(v[1]+''+track)
          if(v[1] == track){
            coub = v[2]
          }
        })
      }else{
        aska_dj2.forEach((v)=>{
          console.log(v[1]+''+track)
          if(v[1] == track){
            coub = v[2]
            if(from_what != undefined){
              start_sec = v[3]
              end_sec = v[4]
            }
          }
        })
        ws.users.last_track.push(track)
        if(ws.users.last_track.length > 4){
          ws.users.last_track.splice(0,1)
        }
        console.log(ws.users.last_track)
      }
    }else{
      track = aska_dj2[0][1]
      coub = aska_dj2[0][2]
      start_sec = false
      end_sec = false
    }
    ws.users.track = track
    console.log(track)
    //console.log(ws.users.HydraFire.track)
    //windowManager.sharedData.set('playing_music', track);
    ///////////////////////////////////////////////////////
    if(from_what == undefined){
      track_played_plus1(ws,track,aska_dj2,1)
    }
    ///////////////////////////////////////////////////////////////


    let code_to_eval_on_client_part1 = `
audio.src = "./users/${ws.users.name}/music/${track}";
coub_animation("./users/${ws.users.name}/video/${coub}")
audio.addEventListener("canplay", function(e) {
e.target.removeEventListener(e.type, arguments.callee)
if(localStorage.music_volume == undefined){localStorage.music_volume = 0.2;}
audio.volume = localStorage.music_volume;
let sec = ${start_sec}
let end = ${end_sec}
if(sec){
audio.currentTime = sec
}else{
audio.currentTime = (Math.random()*10|0)+5
}
if(end){
end = (end - audio.currentTime)*1000
console.log(end)
setTimeout(()=>{
audio.pause();
},end)
}
audio.play();`;
    let event_fo_next_track = ''
    let event_to_next_track2 = 'EVAL'
    console.log(ws.users.aska_play_music)
    //global.aska_play_music = false
    if(!ws.users.aska_play_music){
      event_to_next_track2 += `
function once_replay(){
socket.send('включи музыку')
console.log('Удаляет или нет')
}`;
      event_fo_next_track = `
audio.addEventListener("pause",once_replay)
socket.send('aska_play_music_true')
`;
    }
    let code_to_eval_on_client_part2 = `
}, false);

setTimeout(()=>{
recognition.start();
recognition.addEventListener('end', recognition.start)
},2000)
`;
    let code_sym = event_to_next_track2+code_to_eval_on_client_part1+event_fo_next_track+code_to_eval_on_client_part2
    return code_sym
  }else{
    return ''
  }
}
////////////////////////////////////////////////////////////////////////

const next = function(ws,num,letplay){
  if(ws.users.track != 'none'){
    let arr = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
    let playing = ws.users.track
    track_played_plus1(ws,playing,arr,num)
    let ryr = start(ws)
    if(letplay == true){
      return ryr
    }else{
      return 'Хорошо, тогда, я сделаю чтоб этот трек играл чаще'
    }
  }else{
    return 'Сейчас не играет никакая музыка'
  }
}
//////////////////////////////////////////////////////////////////////////////
const searchTrack = function(ws,text){
  let first = 'найди трек'
  console.log(text)
  if(text == 'найти трек' || text == 'найди трек'){
    return 'Пожалуйста назови имя музыкальной композиции'
  }else{
    let name = text.substring(first.length+1,text.length)
    console.log(name)
    console.log(name)
    console.log(name)
    console.log(name)
    console.log(name)
    let arr = jetpack.read('./JSON/data/'+ws.users.name+'/aska_dj.json','json')
    if(arr){
      let arr_track = []
      arr.forEach((v,index)=>{
        if(v[1].toLowerCase().includes(name.toLowerCase())){
          arr_track.push(arr[index][1])
        }
      })
      if(arr_track != ''){
        return start(ws,'none',arr_track[(Math.random()*arr_track.length)|0])
      }else{
        return 'трек с таким названием не найден '+name
      }
    }else{
      return 'Я невижу файлов музыки, ты должен их сперва залить'
    }
  }
}
///////////////////////////////////////////////////////////////////////////////
const stop = function(ws){
  ws.users.aska_play_music = false
  //windowManager.sharedData.set('playing_music','none');
  return `EVAL
audio.removeEventListener('pause',once_replay)
audio.pause();
`;
}
const volume = function(znak,v){
  return `EVAL
localStorage.audioVolume = parseFloat(localStorage.audioVolume)${znak}${v}; 
if(parseFloat(localStorage.audioVolume) > 1){
localStorage.audioVolume = 1
}
if(parseFloat(localStorage.audioVolume) < 0.1){
localStorage.audioVolume = 0.1
}
audio.volume = localStorage.audioVolume;
console.log('Громкость: '+localStorage.audioVolume)
`;
}


//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
exports.start = start;
exports.next = next;
exports.searchTrack = searchTrack;
exports.stop = stop;
exports.volume = volume;





