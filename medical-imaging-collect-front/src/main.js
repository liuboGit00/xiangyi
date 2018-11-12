import Vue from 'vue'
import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import axios from './axios/axios.js'
import router from './router'
import '../src/assets/iconfont/iconfont.css'
import "../src/assets/css/main.css"
import $ from "jquery"


Vue.use(ElementUI);
Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

