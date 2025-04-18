import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 使用交叉类型扩展 RouteRecordRaw
export type CustomRouteRecord = RouteRecordRaw & {
  name: string
  meta: {
    title: string
    type?: 'primary' | 'secondary' // 主要路由 | 次要路由
    requiresAuth?: boolean
    keepAlive?: boolean
    [key: string]: any
  }
}

export const constantRoutes: Array<CustomRouteRecord> = [
  {
    path: '/',
    name: 'ActivitySquare',
    component: () => import('@/views/activity-square/index.vue'),
    meta: {
      title: '活动广场',
      type: 'primary',
    },
  },
  {
    path: '/my-activity',
    name: 'MyActivity',
    component: () => import('@/views/my-activity/index.vue'),
    meta: {
      title: '我的活动',
      type: 'primary',
    },
  },
  {
    path: '/activity/setting/:activityId',
    name: 'AddActivity',
    component: () => import('@/views/activity-setting/index.vue'),
    meta: {
      title: '活动设置',
      type: 'primary',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      type: 'secondary',
    },
  },
  {
    path: '/works',
    name: 'Works',
    component: () => import('@/views/works/index.vue'),
    meta: {
      title: '作品',
      type: 'secondary',

    },
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('@/views/ranking/index.vue'),
    meta: {
      title: '排行',
      type: 'secondary',

    },

  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/statistics/index.vue'),
    meta: {
      title: '统计',
      type: 'secondary',

    },
  },
]

export const routes = [...constantRoutes]

export default createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})
