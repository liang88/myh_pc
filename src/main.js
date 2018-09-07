// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axio from 'axios'
import * as filters from './filters/'
import global from  './global'

Vue.config.productionTip = false
var axios = axio.create()
axios.defaults.headers.post['Content-Type'] = 'application/json'
// Vue.http.interceptors.push((request,next)=>{
//   request.credentials = true; // 接口每次请求会跨域携带cookie
//   request.method= 'POST'; // 请求方式（get,post）
//   request.headers.set('token','111') // 请求headers携带参数
 
//   next(function(response){
//     return response;
 
//   });
// })
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios

Object.keys(filters).forEach((key)=>Vue.filter(key,filters[key]))
Vue.prototype.tranxingstart= function (score) {
  var yellowxing = ''
  var allxing = ''
  yellowxing = score/20
  yellowxing = Math.floor(yellowxing)
  for(var s=0; s<yellowxing; s++){
    allxing = allxing + '<img src="/static/images/xing.gif"/>'
  }
   var hxx = 5-yellowxing
  if(score%20 > 0){
    allxing = allxing + '<img src="/static/images/xingh.jpg"/>'
    hxx = hxx-1
  }
  for(var h=0; h<hxx; h++){
    allxing = allxing + '<img src="/static/images/xinghui.gif"/>'
  }

  return allxing
}
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
