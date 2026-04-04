import { createRouter, createWebHistory } from 'vue-router'
import mainlayout from '../layouts/mainlayout.vue'

const routes = [
  {
    path: '/',
    component: mainlayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: { title: '首页', icon: 'HomeFilled' }
      },
      {
        path: 'discover',
        name: 'Discover',
        component: () => import('../views/discover/index.vue'),
        meta: { title: '发现', icon: 'Compass' }
      },
      {
        path: 'publish',
        name: 'Publish',
        component: () => import('../views/publish/index.vue'),
        meta: { title: '发布', icon: 'Plus' }
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('../views/message/index.vue'),
        meta: { title: '消息', icon: 'ChatDotRound' }
      },
      {
        path: 'me',
        name: 'Me',
        component: () => import('../views/profile/index.vue'),
        meta: { title: '我的', icon: 'User' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router