import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'homes',
      component: Home,
      redirect: '/login',
      children: [{
          path: '/homes',
          name: 'homes',
          component: resolve => require(['../pages/homes/homes.vue'], resolve),
        },
        {
          path: '/reportwatch',
          name: 'reportwatch',
          component: resolve => require(['../pages/watch/reportwatch.vue'], resolve),
        },
        {
          path: '/reportreceive',
          name: 'reportreceive',
          component: resolve => require(['../pages/receive/reportreceive.vue'], resolve),
        },
        {
          path: '/reporttemplate',
          name: 'reporttemplate',
          component: resolve => require(['../pages/template/reporttemplate.vue'], resolve),
        },
        {
          path: '/reportpublic',
          name: 'reportpublic',
          component: resolve => require(['../pages/public/reportpublic.vue'], resolve),
        },
        {
          path: '/editchoicetemp',
          name: 'editchoicetemp',
          component: resolve => require(['../pages/editedashboard/editchoicetemp.vue'], resolve),
        },
        {
          path: '/editedashboard',
          name: 'editedashboard',
          component: resolve => require(['../pages/editedashboard/editedashboard.vue'], resolve),
        },
        {
          path: '/dashboardpreview',
          name: 'dashboardpreview',
          component: resolve => require(['../pages/editedashboard/dashboardpreview.vue'], resolve),
        },
        {
          path: '/editrepoart',
          name: 'editrepoart',
          component: resolve => require(['../pages/editrepoart/editrepoart.vue'], resolve),
        },
        {
          path: '/editchoicerepot',
          name: 'editchoicerepot',
          component: resolve => require(['../pages/editrepoart/editchoicetemp.vue'], resolve),
        },
        {
          path: '/reportpreview',
          name: 'reportpreview',
          component: resolve => require(['../pages/editrepoart/reportpreview.vue'], resolve),
        },
        {
          path: '/dashboardprevmultiple',
          name: 'dashboardprevmultiple',
          component: resolve => require(['../pages/editedashboard/dashboardprevmultiple.vue'], resolve),
        },
        {
          path: '/reportprevmultiple',
          name: 'reportprevmultiple',
          component: resolve => require(['../pages/editrepoart/reportprevmultiple.vue'], resolve),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/login/login.vue'], resolve),
    },
  ]
})
