import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import User from "@/views/User";
import demo from "@/views/demo";
import Login from "@/views/Login";
import Register from "@/views/Register";
import PersonInfo from "@/views/PersonInfo";
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录',
    component: Login,
  },
  {
    path: '/register',
    name: '注册',
    component: Register,
  },
  {
    path: '/',
    name: '管理系统',
    component: HomeView,
    redirect:'/user',
    children:[{
      path: '/user',
      name: '用户管理',
      component: User,
    },
      {
        path: '/userInfo',
        name: '用户详情',
        component: PersonInfo,
      },
      {
        path: '/index',
        name: '测试',
        component: demo,

      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
