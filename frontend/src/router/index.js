
// 路由
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('../views/discover/index.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/publish/index.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/message/index.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router