import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeComponent from '../components/home/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'home',
    component: HomeComponent

  }]
})

export default router
