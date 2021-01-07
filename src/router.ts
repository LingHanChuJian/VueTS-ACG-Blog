import Vue from 'vue'
import nprogress from 'nprogress'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('@/views/client/Index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/client/Home.vue'),
      },
      {
        path: '/s',
        name: 'search',
        component: () => import('@/views/client/Search.vue'),
      },
      {
        path: '/archives',
        name: 'archives',
        component: () => import('@/views/client/Archives.vue'),
      },
      {
        path: '/article/:year/:month/:day/:subtitle',
        name: 'article',
        component: () => import('@/views/client/Article.vue'),
      },
      {
        path: '/categories/:categories',
        name: 'categories',
        component: () => import('@/views/client/Categories.vue'),
      },
      {
        path: '/tags/:tag',
        name: 'tags',
        component: () => import('@/views/client/Tag.vue'),
      },
      {
        path: '/donate',
        name: 'donate',
        component: () => import('@/views/client/Donate.vue'),
      },
      {
        path: '/friends',
        name: 'friends',
        component: () => import('@/views/client/Friends.vue'),
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('@/views/client/Me.vue'),
      },
    ],
  },
  {
    path: '/docs/client',
    redirect: '/docs/client/layout',
    component: () => import('@/docs/Index.vue'),
    children: [
      {
        path: '/docs/client/layout',
        name: 'layout',
        component: () => import('@/docs/LayoutDoc.vue'),
      },
      {
        path: '/docs/client/menu',
        name: 'menu',
        component: () => import('@/docs/MenuDoc.vue'),
      },
      {
        path: '/docs/client/poptip',
        name: 'poptip',
        component: () => import('@/docs/PoptipDoc.vue'),
      },
      {
        path: '/docs/client/icon',
        name: 'icon',
        component: () => import('@/docs/IconDoc.vue'),
      },
      {
        path: '/docs/client/message',
        name: 'message',
        component: () => import('@/docs/MessageDoc.vue'),
      },
      {
        path: '/docs/client/input',
        name: 'input',
        component: () => import('@/docs/InputDoc.vue'),
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
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      resolve(to.hash ? { selector: to.hash } : (savedPosition ? savedPosition : { x: 0, y: 0 }))
    })
  },
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})

router.afterEach((to, from) => {
  nprogress.done()
})

export default router
