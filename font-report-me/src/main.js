// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import reset from '@/assets/css/common.css'
import iconfont from '@/assets/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios/axios.js';
import store from './store/index'
import qs from 'qs';
import echarts from 'echarts'
import $ from 'jquery'


import '@/assets/js/test.js'   //测试用js

Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);

// 路由拦截
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login') {
//     if (!sessionStorage.getItem("testUserSessions")) {
//       router.push({
//         path: '/login'
//       })
//     }
//   }
//   next()
// })



Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
