import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import contactList from '../components/contactList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'contactList',
    component: contactList
  },
  {
   path:'/better',
   name:'better',
   component:()=>import('../components/contactList_better.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/axiosAll',
    name: 'axiosAll',
    component: () => import('../views/axiosAll.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
