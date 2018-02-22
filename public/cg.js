(function e(t,n,r){
  function s(o,u){
    if(!n[o]){
      if(!t[o]){
        var a=typeof require=="function" && require;
        if(!u&&a)return a(o,!0);
        if(i)return i(o,!0);
        var f=new Error("Cannot find module '"+o+"'");
        throw f.code="MODULE_NOT_FOUND",f
      }
      var l=n[o]={
        exports:{}};t[o][0].call(l.exports,function(e){
          var n=t[o][1][e];
          return s(n?n:e)},l,l.exports,e,t,n,r)
    }
    return n[o].exports
  }
  var i=typeof require=="function"&&require;
  for(var o=0;o<r.length;o++)s(r[o]);
  return s
})
({1:[function(require,module,exports){
  const Analyser = require('web-audio-analyser')
  
  const audio = document.getElementById('audio');
  const audio2 = document.getElementById('audio2');
    
    
 

  var analyser = null;
  //audioTag
  //localStorage.audioVolume = 0.45;
  localStorage.aaaa = 'play';
  // src
  // audio.src = 'tracks/Deepierro Remix.mp3'
  //audio.src = 'tracks/Buku.mp3'
  //   audio.src = url;
  //  audio.load();

  audio.crossOrigin = "anonymous";
  //audio.src = 'tracks/Teminite  Starr Chen - Fireflies.mp3' // src

  //var audio = document.getElementById('audio');
  // audio.addEventListener('canplay', canplay, false)
  //audio.crossOrigin = 'Anonymous'
  //audio.loop = false
  function pause(){
    audio.stop()
  }

  audio.load()
  audio.loop = false;
  canplay (audio)
  function canplay (audio) {

    audio.play()

    setTimeout(function () {
      analyser = Analyser(audio)
    },100)


    var frequencies
    var waveform
    let m = false
    setInterval(()=>{
      if(analyser){
        frequencies = analyser.frequencies();
        //waveform = analyser.waveform();
        if(audio.volume != localStorage.audioVolume){
          audio.volume = localStorage.audioVolume
        }
        if(audio2.volume != localStorage.audioVolume2){
          audio2.volume = localStorage.audioVolume2
        }
   
        if(localStorage.aaaa == 'pause'){
          audio.pause()
        }
        
        
          
        
        
         iAudio = ((frequencies[5]+frequencies[10]+frequencies[15]+frequencies[20]+frequencies[25]+frequencies[30]+frequencies[35])/2000)+0.2;

         //console.log(iAudio)
        /*
        let video = document.querySelector('video')
        
        if(video){/
            video.onloadeddata = function() {
              m = true
            }
            
            if(m){
              draw_video(video);
            }
        }else{
          
          m = false
          draw(waveform,frequencies)
        }
        */
        //////////////////////////////////////////////////////////////
      }
    },15)
  }


},{"./remember":3,"web-audio-analyser":2}],
  2:[function(require,module,exports){
    var AudioContext = window.AudioContext || window.webkitAudioContext

    module.exports = WebAudioAnalyser

    function WebAudioAnalyser(audio, ctx, opts) {
      if (!(this instanceof WebAudioAnalyser)) return new WebAudioAnalyser(audio, ctx, opts)
      if (!(ctx instanceof AudioContext)) (opts = ctx), (ctx = null)

        opts = opts || {}
        this.ctx = ctx = ctx || new AudioContext

        if (!(audio instanceof AudioNode)) {
          audio = (audio instanceof Audio || audio instanceof HTMLAudioElement)
            ? ctx.createMediaElementSource(audio)
          : ctx.createMediaStreamSource(audio)
        }

      this.analyser = ctx.createAnalyser()
      this.stereo   = !!opts.stereo
      this.audible  = opts.audible !== false
      this.wavedata = null
      this.freqdata = null
      this.splitter = null
      this.merger   = null
      this.source   = audio

      if (!this.stereo) {
        this.output = this.source
        this.source.connect(this.analyser)
        if (this.audible)
          this.analyser.connect(ctx.destination)
          } else {
            this.analyser = [this.analyser]
            this.analyser.push(ctx.createAnalyser())

            this.splitter = ctx.createChannelSplitter(2)
            this.merger   = ctx.createChannelMerger(2)
            this.output   = this.merger

            this.source.connect(this.splitter)

            for (var i = 0; i < 2; i++) {
              this.splitter.connect(this.analyser[i], i, 0)
              this.analyser[i].connect(this.merger, 0, i)
            }

            if (this.audible)
              this.merger.connect(ctx.destination)
              }
    }

    WebAudioAnalyser.prototype.waveform = function(output, channel) {
      if (!output) output = this.wavedata || (
        this.wavedata = new Uint8Array((this.analyser[0] || this.analyser).frequencyBinCount)
      )

      var analyser = this.stereo
      ? this.analyser[channel || 0]
      : this.analyser

      analyser.getByteTimeDomainData(output)

      return output
    }

    WebAudioAnalyser.prototype.frequencies = function(output, channel) {
      if (!output) output = this.freqdata || (
        this.freqdata = new Uint8Array((this.analyser[0] || this.analyser).frequencyBinCount)
      )

      var analyser = this.stereo
      ? this.analyser[channel || 0]
      : this.analyser

      analyser.getByteFrequencyData(output)

      return output
    }

  },{}],3:[function(require,module,exports){
    module.exports = function (audio) {
      const t = parseFloat(localStorage.getItem('remember:audioPosition')) || 0

      audio.currentTime = t

      setInterval(function () {
        localStorage.setItem('remember:audioPosition', String(audio.currentTime))
      }, 250)
    }

  },{}]},{},[1]);


