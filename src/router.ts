import Vue from 'vue'
import nprogress from 'nprogress'
import VueRouter, { Route, RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/archives',
        name: 'archives',
        component: () => import('@/views/Archives.vue'),
      },
    ],
  },
  {
    path: '/doc',
    component: () => import('@/document/Index.vue'),
    children: [
      {
        path: '/doc',
        name: 'layout',
        component: () => import('@/document/LayoutDoc.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to: Route, from: Route, next) => {
  nprogress.start()
  next()
})

router.afterEach((to: Route, from: Route) => {
  nprogress.done()
})

export default router
