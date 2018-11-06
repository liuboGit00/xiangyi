import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/Login',
      children: [{
        path: '/Report-index',
        name: 'Report-index',
        component: resolve => require(['../pages/Report-index.vue'], resolve),
        meta: {
          title: '首页'
        },
        },
        {
          path: '/Report-watch',
          name: 'Report-watch',
          component: resolve => require(['../pages/Report-watch.vue'], resolve),
          meta: {
            title: '查看报告'
          },
        },
        {
          path: '/Report-receive',
          name: 'Report-receive',
          component: resolve => require(['../pages/Report-receive.vue'], resolve),
          meta: {
            title: '报告接收'
          },
        },
        {
          path: '/Report-template',
          name: 'Report-template',
          component: resolve => require(['../pages/Report-template.vue'], resolve),
          meta: {
            title: '报告模板'
          },
        },
        {
          path: '/Report-public',
          name: 'Report-public',
          component: resolve => require(['../pages/Report-public.vue'], resolve),
          meta: {
            title: '报告发布'
          },
        },
        {
          path: '/Report-choiceTemp',
          name: 'Report-choiceTemp',
          component: resolve => require(['../pages/Report-choiceTemp.vue'], resolve),
          meta: {
            title: '路由的名字'
          },
        },
        {
          path: '/Report-dashboardTemp',
          name: 'Report-dashboardTemp',
          component: resolve => require(['../pages/editdashboard/Report-dashboardTemp.vue'], resolve),
          meta: {
            title: '大屏-选模板'
          },
        },
        {
          path: '/Report-dashboardPreview',
          name: 'Report-dashboardPreview',
          component: resolve => require(['../pages/editdashboard/dashboardPreview.vue'], resolve),
          meta: {
            title: '路由的名字'
          },
        },
        {
          path: '/Report-editRepoart',
          name: 'Report-editRepoart',
          component: resolve => require(['../pages/editrepoart/Report-editRepoart.vue'], resolve),
          meta: {
            title: '报告编辑'
          },
        },
        {
          path: '/Report-editChoiceTemp',
          name: 'Report-editChoiceTemp',
          component: resolve => require(['../pages/editrepoart/Report-editChoiceTemp.vue'], resolve),
          meta: {
            title: '报告-选模板'
          },
        },
        {
          path: '/Report-preview',
          name: 'Report-preview',
          component: resolve => require(['../pages/editrepoart/Report-preview.vue'], resolve),
          meta: {
            title: '路由的名字'
          },
        },
        {
          path: '/Report-dashboardMultiPreview',
          name: 'Report-dashboardMultiPreview',
          component: resolve => require(['../pages/editdashboard/Report-dashboardMultiPreview.vue'], resolve),
          meta: {
            title: '路由的名字'
          },
        },
        {
          path: '/Report-reportMultiPreview',
          name: 'Report-reportMultiPreview',
          component: resolve => require(['../pages/editrepoart/Report-reportMultiPreview.vue'], resolve),
          meta: {
            title: '路由的名字'
          },
        },
        {
          path: '/Report-createDashboard',
          name: 'Report-createDashboard',
          component: resolve => require(['../pages/editdashboard/Report-createDashboard.vue'], resolve),
          meta: {
            title: '大屏'
          },
        },
        {
          path: '/Report-dashboardTempDefine',
          name: 'Report-dashboardTempDefine',
          component: resolve => require(['../pages/editdashboard/Report-dashboardTempDefine.vue'], resolve),
          meta: {
            title: '大屏-自定义模板'
          },
        },
      ],
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['../pages/login/Login.vue'], resolve),
      meta: {
        title: '路由的名字'
      },
    },
  ]
})
