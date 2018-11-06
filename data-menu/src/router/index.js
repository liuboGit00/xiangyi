import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'homes',
      component:Home,
      redirect: '/login',
      children: [{
          path: '/homes',
          name: 'homes',
          component: resolve => require(['../pages/homes/homes.vue'], resolve),
          meta:{
            title:"首页",
          }
        },{
          path: '/signList',
          name: 'signList',
          component: resolve => require(['../pages/signList/signList.vue'], resolve),
          meta:{
            title:"数签目录",
          }
        },{
          path: '/signDetails',
          name: 'signDetails',
          component: resolve => require(['../pages/signDetails/signDetails.vue'], resolve),
          meta:{
            title:"数签详情",
          }
        },{
          path: '/numSign',
          name: 'numSign',
          component: resolve => require(['../pages/myNumSign/numSign.vue'], resolve),
          meta:{
            title:"我的数签",
          }
        },{
          path: '/detailsPage',
          name: 'detailsPage',
          component: resolve => require(['../pages/myNumSign/detailsPage.vue'], resolve),
          meta:{
            title:"数签详情",
          }
        },{
          path: '/forSigning',
          name: 'forSigning',
          component: resolve => require(['../pages/organForSigning/forSigning.vue'], resolve),
          meta:{
            title:"组织数签",
          }
        },{
          path: '/edit',
          name: 'edit',
          component: resolve => require(['../pages/edit/edit.vue'], resolve),
          meta:{
            title:"数签编辑",
          }
        },
        {
          path: '/organization',
          name: 'organization',
          component: resolve => require(['../pages/organForSigning/organization.vue'], resolve),
          meta:{
            title:"数签详情",
          }
        },
      ],
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/login/login.vue'], resolve),
    }
  ]
})
