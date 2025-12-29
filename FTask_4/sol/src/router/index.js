import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryDetail from '../views/CountryDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/country/:name',
    name: 'country-detail',
    component: CountryDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
