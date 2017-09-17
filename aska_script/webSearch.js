

const get = require('simple-get')
exports.post_to_str = function(ws,site,leng,search_text,par,plus_text,start_text){
  ws.users.new_par = false
  get({
    url: site,
    method: 'POST',
    body: {
      key: 'value'
    },
    json: true,
    // simple-get accepts all options that node.js `http` accepts 
    // See: http://nodejs.org/api/http.html#http_http_request_options_callback 
    headers: {
      'user-agent': 'my cool app'
    }
  }, function (err, res) {
    console.log(err)
    let n = 0
    global.arr_text_post = []
    res.on('data', function (chunk) {
      arr_text_post.push(chunk.toString())
      console.log('Длина массива '+arr_text_post.length+' Длина одной записи '+arr_text_post[n].length)
      n+=1
      console.log(n)
    })
  }
     )
  setTimeout(()=>{
    let na_scolko = leng
    let d = search_text
    let string_from_net = ''
    if(global.arr_text_post){
    global.arr_text_post.forEach((v,i)=>{
      string_from_net +=v
    })


    let jih = string_from_net.search(d)
    console.log(jih)
    if(jih!=-1){
      let sub_v = string_from_net.substring(jih+d.length,jih+d.length+na_scolko)
      console.log(sub_v)

      /*
    let end_teg = sub_v.search('>')
    if(end_teg != -1){
      sub_v = sub_v.substring(end_teg+1,sub_v.length)
      let open_teg = sub_v.search('<')
      sub_v = sub_v.substring(0,open_teg)
      console.log(sub_v)
    }
    */

      function del_teg(v){
        console.log(v)
        let a = v.search('<')
        console.log('a= '+a)
        let b = v.search('>')
        console.log('b= '+b)
        if(b== -1&&a!=-1){
          v = v.substring(0,a)
          console.log('v= '+v)
        }
        if(a>b){
          v = v.substring(b+1,v.length)
          v = del_teg(v)
        }else if(a!= -1&&b!= -1){
          let y = v.substring(0,a)
          v = v.substring(b+1,v.length)
          v = y+' '+v
          v = del_teg(v)
        }
        return v
      }
      function del_simvol(v,s,e){
        let a = v.search(s)
        let j
        if(a!= -1){
          let b = v.substring(0,a)
          let c = v.substring(a,v.length)
          e?j = c.search(e):j = c.search(' ')
          let d = c.substring(j+1,c.length)
          v = b+' '+d
          v = del_simvol(v,s,e)
        }
        return v
      }
      function del_probel(v){
        let new_v =''
        let t = 0
        for(i=0;i<v.length;i++){
          if(v[i]==' '){
            t++

            if(t==1){
              new_v+=v[i]
            }
            if(t==4){
              new_v+=','
            }
          }
          if(v[i]=='.'){
            new_v+=' '
          }else
            if(v[i]!=' '){
              t = 0
              new_v+=v[i]
            }
          console.log(t)
        }
        return new_v
      }
      console.log(sub_v)
      sub_v = del_teg(sub_v)
      console.log(sub_v)
      sub_v = del_simvol(sub_v,'&',';')
      par?sub_v = del_probel(sub_v):'';
      console.log('END '+sub_v)






      if(start_text == undefined){
        if(plus_text == undefined){
          ws.send("Сейчас "+sub_v)
        }else{
          ws.send("Сейчас "+sub_v+' '+plus_text)
        }
      }else{
        if(plus_text == undefined){
          ws.send(start_text+' '+sub_v)
        }else{
          ws.send(start_text+' '+sub_v+' '+plus_text)
        }
      }
      ws.users.new_par = true
      ws.users.aska_talks = false
    }else{
      ws.send('запрашиваемые данные, не найдены')
    }
    }else{
      ws.send('какие то неполадки с сетью, попробуй еще раз')
    }
  },3000)
}