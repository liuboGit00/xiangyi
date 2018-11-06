import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/login',
      children: [
        {
          path: '/reportwatch',
          name: 'reportwatch',
          component: resolve => require(['../pages/watch/reportwatch.vue'], resolve),
        },
        {
          path: '/reportcreate',
          name: 'reportcreate',
          component: resolve => require(['../pages/create/reportcreate.vue'], resolve),
        },
        {
          path: '/reportheme',
          name: 'reportheme',
          component: resolve => require(['../pages/theme/reportheme.vue'], resolve),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/login/login.vue'], resolve),
    },
    {
      path: '/newPage',
      name: 'newPage',
      component: resolve => require(['../pages/page/newPage.vue'], resolve),
    },
    {
      path: '/newztPage',
      name: 'newztPage',
      component: resolve => require(['../pages/pagezt/newztPage.vue'], resolve),
    },
  ]
})
