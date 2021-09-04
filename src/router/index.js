import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listView',
    name: 'ListView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/ListView.vue')
  },
  {
    path: '/searchView',
    name: 'SearchView',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/person',
    name: 'Person',
    meta: {
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "Person" */ '../views/Person.vue')
  },
  {
    path: '/hotPlaylist',
    name: 'HotPlaylist',
    component: () => import(/* webpackChunkName: "HotPlaylist" */ '../views/Home/GengduoGedan.vue')
  },
  {
    path: '/mv/:id',
    name: 'MvView',
    component: () => import(/* webpackChunkName: "MvView" */ '../views/Mv/MvView')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!store.state.user.isLogin) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
