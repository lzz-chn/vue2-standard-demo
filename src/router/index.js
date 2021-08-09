import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '关于' }
  },
  {
    path: '/defaultPage/:type',
    name: 'defaultPage',
    component: () => import('@/components/DefaultPage') // 缺省页
  },
  {
    path: '*',
    redirect: '/defaultPage/notFound' // 路由错误无此页面
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // 根据meta修改title
  to.meta.title && (document.title = to.meta.title)
  next()
})

export default router
