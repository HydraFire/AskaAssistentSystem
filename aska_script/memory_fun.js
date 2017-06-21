
const jetpack = require('fs-jetpack');



const save = function(ask,answer,ws){
  var adreesJSON = './JSON/data/'+ws.x_user+'/NN_Train.json';
  var NN_Train = jetpack.read(adreesJSON,'json');
  if(!NN_Train){
    NN_Train = [
      {
        "input": {
          "привет": 0.99
        },
        "output": {
          "привет": 0.99
        }
      }
    ]
  }
  var arr_t = [ask,answer]
  var arr_l = ask
  var arr_r = answer
  var arr_final = arr_t.map(v=>arr_l = v.split(' '))
  var obj_f = {}
  var t = {}
  var h = {}
  arr_final[0].map((v,i)=>{t[v] = (99-i*4)/100})
  arr_final[1].map((v,i)=>{h[v] = (99-i*4)/100})
  obj_f['input'] = t
  obj_f['output'] = h

  NN_Train.push(obj_f)


  jetpack.write(adreesJSON,NN_Train);
  return 'запомнила '+ask+' , '+answer
}
exports.save = save;