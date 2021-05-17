import Vue from 'vue'
import Router from 'vue-router'
// import Test from './views/link/linkPage.vue'
//import Home from './views/Home.vue'

Vue.use(Router)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/common/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      children:[
        {
          path: '/ARPage',
          name: 'ARPage',
          component: () => import(/* webpackChunkName: "about" */ './views/AR/ARPage.vue')
        },
        {
          path: '/mapPage',
          name: 'mapPage',
          component: () => import(/* webpackChunkName: "about" */ './views/map/mapPage.vue')
        },
        {
          path: '/linkPage',
          name: 'linkPage',
          component: () => import(/* webpackChunkName: "about" */ './views/link/linkPage.vue')
        }
      ]
    }
  ]
})
