import Vue from 'vue'
import Router from 'vue-router'
// import SideBar from '../common/SideBar.vue'
// import Home from '../common/Home.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/apparatus'
    },
    {
      path: '/login',
      component: resolve => require(['../page/Login.vue'], resolve),
    },
    {
      path: '/',
      component: resolve => require(['../common/Home.vue'], resolve),
      meta: {
        title: 'home'
      },
      children: [{
        path: '/apparatus',
        name: 'apparatus',
        component: resolve => require(['../page/Apparatus.vue'], resolve),
        meta: {
            title: '样本创建'
          }
        },
        {
          path: '/patient-newForm',
          name: 'patient-newForm',
          component: resolve => require(['../page/Patient-newForm.vue'], resolve),
          meta: {
            title: '样本创建'
          }
        },
        {
          path: '/Pative-seeform',
          name: 'Pative-seeform',
          component: resolve => require(['../page/Pative-seeform.vue'], resolve),
          meta: {
            title: '样本查询'
          }
        },
        {
          path: '/patients-image',
          name: 'patients-image',
          component: resolve => require(['../page/Patients-Image.vue'], resolve),
          meta: { title: '样本提交' }
        },
        {
          path: '/patient-list',
          name: 'patient-list',
          component: resolve => require(['../page/Patient-List.vue'], resolve),
          meta: { title: '样本查询' }
        },
        {
          path: '/createAsample-toView',
          name: 'CreateAsample-toView',
          component: resolve => require(['../page/CreateAsample-toView.vue'], resolve),
          meta: { title: '样本查询' }
        },
        {
          path: '/patients-image',
          component: resolve => require(['../page/Patients-Image.vue'], resolve),
          meta: { title: '样本提交' }
        },
        {
          path: '/patient-search',
          component: resolve => require(['../page/Patient-search.vue'], resolve),
          meta: { title: '样本查询' }
        },
        {
          path: '/patient-upload',
          component: resolve => require(['../page/Patient-upload.vue'], resolve),
          meta: { title: '样本提交' }
        }
      ]
    }
  ]
})

