

const get = require('simple-get')
exports.post_to_str = function(ws,site,leng,search_text){
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
    let d_search = search_text
    let fghi = ''
    global.arr_text_post.forEach((v,i)=>{
      fghi +=v
    })
    let jih = fghi.search(d_search)
    console.log(jih)
    let sub_v = fghi.substring(jih+d_search.length,jih+d_search.length+na_scolko)
    console.log(sub_v)
    let end_teg = sub_v.search('>')
    sub_v = sub_v.substring(end_teg+1,sub_v.length)
    let open_teg = sub_v.search('<')
    sub_v = sub_v.substring(0,open_teg)
    console.log(sub_v)
    ws.send("Сейчас "+sub_v)
    /*
  let ot_kyda = 42950
  let do_kyda = 2000
  let na_scolko = 8
  let d_search = '<h2 style="color: padding: 0px 20px 10px;">Смотреть Берсерк ТВ-3 / Berserk TV-3'
  let nn = 0
  let sym = 0
  let nash_response = ''
  global.arr_text_post.forEach((v,i)=>{
    nn += v.length;
    console.log(nn)
    if(nn > ot_kyda){
      sym = nn - ot_kyda
      console.log(sym)
      sym = global.arr_text_post[i].length - sym 
      console.log(sym)
      console.log(i)
      nash_response = global.arr_text_post[i]
      nash_response = nash_response.substring(sym,sym+do_kyda)
      //console.log(nash_response)
      let ji = nash_response.search(d_search)
      if(ji != -1){
      let sub_v = nash_response.substring(ji+d_search.length,ji+d_search.length+na_scolko)
      console.log('НАЙДЕНО'+sub_v)
      }else{
      console.log('НЕ НАЙДЕНО')
      }
    }
  })
  */
  },3000)
}