
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
    path: '/visitors_per_hour',
    name: 'VisitorsPerHour',
    component: VisitorsPerHour
  },
  {
    path: '/attr_power',
    name: 'AttractionPower',
    component: AttractionPower
  },
  {
    path: '/playback',
    name: 'PlayBack',
    component: () => import(/* webpackChunkName: "playback" */ '../views/PlayBack.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
