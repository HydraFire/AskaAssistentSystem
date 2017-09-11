

const jetpack = require('fs-jetpack');
const this_real_time = require('./polival_kystu').this_real_time;
var arr = [
  ['345678','список заданий','false','time'],
  ['785698','здоровье','false','time'],
  ['345678','пропить курс таблеток','false','time'],
  ['245648','сходить к врачу','false','time'],
  ['165322','прочесть книгу','false','time'],
  ['826772','найти сайт с выбором книг который бы понравился','false','time'],
  ['455789','найти достойную книгу','false','time'],
  ['545678','скачать','false','time']
]
function search_i(arr,e){
  let x = 0
  arr.forEach((v,i)=>{
    v[1]==e?x=i:''
  })
  return x
}
function search_i_id(arr,e){
  let x = 0
  arr.forEach((v,i)=>{
    v[0]==e?x=i:''
  })
  return x
}
function search_id(arr,e){
  let x = 0
  arr.forEach((v,i)=>{
    v[1]==e?x=v[0]:''
  })
  return x
}
function create_node(arr,a,b,c){
  let random_id = Math.random()*600000|0
  a = search_i(arr,a)
  b = search_i(arr,b)
  a = parseFloat(arr[a][0])
  console.log('a = '+a)
  let bb = parseFloat(arr[b][0])
  console.log('bb = '+bb)
  console.log('c = '+random_id)
  let sym = (a+bb+random_id)/3
  console.log('sym = '+sym)
  arr[b].push(sym)
  arr.push([random_id,c,'false','time'])
  return arr
}
exports.create_node = create_node;
function start_node(arr,b,c,ws){
  console.log('B= '+b+' C= '+c)
  let z = get_list(b,c,arr)
  console.log('Z= '+z)
  console.log('Z= '+z[0])
  if(z.length>0){
    console.log('C= '+c)
    start_node(arr,c,z[0],ws)
  }else{
    ws.send('Начинаем из '+c)
  let arrs = [b,c,this_real_time(),ws.users.quest_buffer_a,ws.users.quest_buffer_b];
  jetpack.write('./JSON/data/'+ws.users.name+'/quest_ongoing.json',arrs);
  }
  
}
exports.start_node = start_node;
function delete_node(arr,b,c,ws){
  let z = search_i(arr,b)
  let answer = get_list(b,c,arr)
  if(answer.length>1){
    answer.forEach((v)=>{
      arr = delete_node(arr,c,v,ws)
      //c = search_i(arr,c)
      //arr.splice(c,1)
    })
  }
    b = search_id(arr,b)

    console.log('DELETE NODE')
    c = search_id(arr,c)
    console.log('C= '+c)
    b = parseFloat(b)
    console.log('B= '+b)
    c = parseFloat(c)
    console.log('C= '+c)
    console.log('Z= '+z)
    arr[z].forEach((v,i)=>{
      if(i>=4){
        arr.forEach((m,i)=>{
          let a = parseFloat(m[0])
          console.log('A= '+a)
          let sym = (a+c+b)/3
          console.log('сейчас смотри '+sym)
          if(v == sym){
            console.log(v+' ровно '+sym)
            arr[z].forEach((t,i)=>{
              if(t == sym){
                arr[z].splice(i,1)
              }
            })
          }
        })
      }
    })
    //c = search_i_id(arr,c)
    //console.log('ищем '+c)
    console.log('удалили '+c)
    c = search_i_id(arr,c)
    arr.splice(c,1)
    //arr.splice(c,1)
  

  return arr
}
exports.delete_node = delete_node;
function save_link(a,b,c,arr){
  let sym = 0
  let z = b
  a = parseFloat(search_id(arr,a))
  b = parseFloat(search_id(arr,b))
  c = parseFloat(search_id(arr,c))
  sym = (a+b+c)/3

  z = search_i(arr,z)
  let h = arr[z].length
  arr[z][h] = sym
  return arr
}

function calc_link(a,b,v,arr){
  let sym = 0
  a = parseFloat(arr[a][0])
  console.log(a)
  b = parseFloat(arr[b][0])
  console.log(b)
  v = parseFloat(v)
  sym = v*3-(a+b)
  console.log('сума '+sym)
  let r = search_i_id(arr,sym)
  console.log('найдено '+r)
  return arr[r][1]
}

function get_list(a,b,arr){
  let arr_x = []
  let arr_b = []
  a = search_i(arr,a)
  b = search_i(arr,b)
  arr[b].forEach((v,i)=>{
    if(i>=4){
      arr_b.push(v)
    }
  })
  console.log(arr_b)
  arr_b.forEach((v)=>{
    arr_x.push(calc_link(a,b,v,arr))
  })
  return arr_x
}
exports.get_list = get_list;


/*
save_link('список заданий','список заданий','здоровье',arr)
save_link('список заданий','список заданий','прочесть книгу',arr)

save_link('список заданий','прочесть книгу','найти сайт с выбором книг который бы понравился',arr)
save_link('список заданий','прочесть книгу','найти достойную книгу',arr)
save_link('список заданий','прочесть книгу','скачать',arr)

save_link('список заданий','здоровье','пропить курс таблеток',arr)
save_link('список заданий','здоровье','сходить к врачу',arr)

create_node(arr,'список заданий','список заданий','купить лук')
create_node(arr,'список заданий','купить лук','отложить 10 грн')
create_node(arr,'список заданий','купить лук','пойти в магазин')

create_node(arr,'купить лук','пойти в магазин','просто проверка')


get_list('купить лук','пойти в магазин',arr)

arr
*/





