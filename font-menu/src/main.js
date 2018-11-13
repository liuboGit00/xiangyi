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
import store from '@/store/index'
import qs from 'qs';
import echarts from 'echarts';
import $ from 'jquery';
import {Tool} from '@/assets/js/tool.js'

Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.prototype.tool = Tool;
Vue.use(ElementUI);

// 路由拦截
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login') {
//     if (!sessionStorage.getItem("testUserSessions")){
//       router.push({path: '/login'})
//     }
//   }
//   next()
// })


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
