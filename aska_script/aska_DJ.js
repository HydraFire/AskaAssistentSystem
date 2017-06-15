

const jetpack = require('fs-jetpack');

function get_new_tracks(){
  let aska_dj = jetpack.read('./JSON/aska_dj.json','json')
  if(!aska_dj){
    aska_dj = [
      [
        1,
        "aska.mp3"
      ]
    ]
  }
  let track_list = jetpack.list('./public/files/music')
  let arr_list = []
  track_list.forEach(v=>{if(v.includes('mp3')){arr_list.push(v)}})


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
  jetpack.write('./JSON/aska_dj.json',aska_dj)
  return aska_dj
}
function track_played_plus1(track,arr,num){
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
  jetpack.write('./JSON/aska_dj.json',arr)
}
/////////////////////////////////////////////////////////////////









const start = function(par,track){
  if(par == 'new'){
    var aska_dj2 = get_new_tracks()
    }else{
      var aska_dj2 = jetpack.read('./JSON/aska_dj.json','json')
      }

  let arr_x5 = []
  let sym = (aska_dj2.length/10)|0;
  for(i=0;i<sym;i++){
    arr_x5.push(aska_dj2[i])
  }
  track == undefined ? track = arr_x5[(Math.random()*arr_x5.length)|0][1]:'';
  global.playing_music = track
  //windowManager.sharedData.set('playing_music', track);
  ///////////////////////////////////////////////////////

  track_played_plus1(track,aska_dj2,1)
  ///////////////////////////////////////////////////////////////
  return `EVAL
audio.src = "./files/music/${track}";
if(localStorage.music_volume == undefined){localStorage.music_volume = 0.2;}
audio.volume = localStorage.music_volume;
audio.currentTime = (Math.random()*10|0)+5
audio.play();

setTimeout(()=>{
recognition.start();
recognition.addEventListener('end', recognition.start)
},2000)
//
function once_replay(e){
e.target.removeEventListener(e.type, arguments.callee)
socket.send('включи музыку')
console.log('Удаляет или нет')
}

audio.addEventListener('pause',once_replay)
`;
}
////////////////////////////////////////////////////////////////////////

const next = function(num,letplay){
  
  if(global.playing_music != 'none'){
    let arr = jetpack.read('./JSON/aska_dj.json','json')
    let playing = global.playing_music
    track_played_plus1(playing,arr,num)
    let ryr = start()
    let xdx = ryr.split('//')
    if(letplay == true){
      // return `EVALaudio2.removeEventListener('pause',once_replay);`+ xdx[0].substring(4,xdx[0].length)
      return xdx[0]
    }else{
      return 'Хорошо, тогда, я сделаю чтоб этот трек играл чаще'
    }
  }else{
    return 'Сейчас не играет никакая музыка'
  }
  
}
//////////////////////////////////////////////////////////////////////////////
const searchTrack = function(text){
  let first = 'найди трек'
  if(text == 'найти трек' || text == 'найди трек'){
    return 'Пожалуйста назови имя музыкальной композиции'
  }else{
    let name = text.substring(first.length+1,text.length)
    let arr = jetpack.read('./JSON/aska_dj.json','json')
    let arr_track = []
    arr.forEach((v,index)=>{
      if(v[1].toLowerCase().includes(name)){
        arr_track.push(arr[index][1])
      }
    })
    if(arr_track != ''){
      return start('none',arr_track[(Math.random()*arr_track.length)|0])
    }else{
      return 'трек с таким названием не найден '+name
    }
  }
}
///////////////////////////////////////////////////////////////////////////////
const stop = function(){
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





