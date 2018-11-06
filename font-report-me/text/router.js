import Vue from "vue";
import Router from "vue-router";
// import Home from '@/pages/home.vue'
// 导入 登录组件
const Login = () => import("@/pages/login/login.vue");
// 导入 首页公共组件
const Home = () => import("@/pages/home.vue");
// 导入 首页组件
const Homes = () => import("@/pages/home/home.vue");
// 导入 查看报告组件
const Watch = () => import("@/pages/Report-watch.vue");
// 导入 报告接收组件
const Receive = () => import("@/pages/Report-receive.vue");
// 导入 报告模板组件
const Template = () => import("@/pages/Report-template.vue");
// 导入 报告发布组件
const Public = () => import("@/pages/Report-public.vue");

Vue.use(Router);

const router = new Router({
  routes: [
    { path: "/Login", component: Login },
    { path: "/", name: "home", redirect: "/home" },
    {
      path: "/home",
      component: Home,
      children: [
        { path: "/home", component: Homes, meta: { title: "首页" } },
        {
          path: "/Report-watch",
          name: "Report-watch",
          component: Watch,
          meta: { title: "查看报告" }
        },
        {
          path: "/Report-receive",
          name: "Report-receive",
          component: Receive,
          meta: {
            title: "报告接收"
          }
        },
        {
          path: "/Report-template",
          name: "Report-template",
          component: Template,
          meta: {
            title: "报告模板"
          }
        },
        {
          path: "/Report-public",
          name: "Report-public",
          component: Public,
          meta: {
            title: "报告发布"
          }
        }
      ]
    }
  ]
});
export default router;
