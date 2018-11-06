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
import qs from 'qs';
import echarts from 'echarts'
import $ from 'jquery'


Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);


var baseWidthRate = window.innerWidth / 1366;
document.documentElement.style.fontSize = parseInt(100 * baseWidthRate) + 'px';

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    if (!sessionStorage.getItem("testUserSession")) {
      router.push({
        path: '/login'
      })
    }
  }
  next()
})


new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
