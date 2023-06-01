import Vue from 'vue'
import VueRouter from 'vue-router'
import TicketView from '../views/TicketView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ticket',
    component: TicketView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AdminLoginView.vue')
  },
  {
    path: '/regiter',
    name: 'regiter',
    component: () => import('../views/AdminRegisterView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/adminUpdate',
    name: 'adminUpdate',
    component: () => import('../views/AdminUpdateView.vue')
  },
  {
    path: '/ticket',
    name: 'ticket',
    component: () => import('../views/TicketView.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/OrderView.vue')
  },
  {
    path: '/more',
    name: 'more',
    component: () => import('../views/MoreView.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/ManageView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
