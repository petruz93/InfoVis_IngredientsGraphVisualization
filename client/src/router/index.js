
import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  },
]

const router = new VueRouter({
  routes
})

export default router
