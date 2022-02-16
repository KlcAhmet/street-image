import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/image-detail',
    name: 'ImageDetail',
    component: () => import('@/views/ImageDetail.vue'),
  },
  {
    path: '/image-search',
    name: 'ImageSearch',
    component: () => import('@/views/ImageSearch'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
