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
    path: '/docs',
    redirect: '/docs/layout',
    component: () => import('@/document/Index.vue'),
    children: [
      {
        path: '/docs/layout',
        name: 'layout',
        component: () => import('@/document/LayoutDoc.vue'),
      },
      {
        path: '/docs/menu',
        name: 'menu',
        component: () => import('@/document/MenuDoc.vue'),
      },
      {
        path: '/docs/poptip',
        name: 'poptip',
        component: () => import('@/document/PoptipDoc.vue'),
      },
      {
        path: '/docs/icon',
        name: 'icon',
        component: () => import('@/document/IconDoc.vue'),
      },
      {
        path: '/docs/message',
        name: 'message',
        component: () => import('@/document/MessageDoc.vue'),
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '*', // 此处需特别注意至于最底部
    redirect: '/404',
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
