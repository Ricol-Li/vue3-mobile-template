/**
 * 可以显示TabBar的路由Name 白名单
 * * 可以显示TabBar的路由Name 白名单
 * ? 注意：路由Name必须配置的
 */
import type { CustomRouteRecord } from '@/router/router'
import activitySquare from '@/assets/images/tabbar/primary_activity_square.png'
import activitySquareActive from '@/assets/images/tabbar/primary_activity_square_active.png'
import myActivity from '@/assets/images/tabbar/primary_my_activity.png'
import myActivityActive from '@/assets/images/tabbar/primary_my_activity_active.png'
import home from '@/assets/images/tabbar/secondary_home.png'
import homeActive from '@/assets/images/tabbar/secondary_home_active.png'
import works from '@/assets/images/tabbar/secondary_works.png'
import worksActive from '@/assets/images/tabbar/secondary_works_active.png'
import ranking from '@/assets/images/tabbar/secondary_ranking.png'
import rankingActive from '@/assets/images/tabbar/secondary_ranking_active.png'
import statistics from '@/assets/images/tabbar/secondary_statistics.png'
import statisticsActive from '@/assets/images/tabbar/secondary_statistics_active.png'

export const routeWhiteList: string[] = [
  'ActivitySquare',
  'MyActivity',
  'Home',
  'Works',
  'Ranking',
  'Statistics',
]

type TabBarRouteList = Omit<CustomRouteRecord, 'component'> & {
  iconPath: string
  selectedIconPath: string
}

export const tabBarPrimaryRouteList: TabBarRouteList[] = [
  {
    path: '/',
    name: 'ActivitySquare',
    iconPath: activitySquare,
    selectedIconPath: activitySquareActive,
    meta: {
      title: '活动广场',
      type: 'primary',
    },
  },
  {
    path: '/my-activity',
    name: 'MyActivity',
    iconPath: myActivity,
    selectedIconPath: myActivityActive,
    meta: {
      title: '我的活动',
      type: 'primary',
    },
  },

]

export const tabBarSecondaryRouteList: TabBarRouteList[] = [
  {
    path: '/home',
    name: 'Home',
    iconPath: home,
    selectedIconPath: homeActive,
    meta: {
      title: '首页',
      type: 'secondary',
    },
  },
  {
    path: '/works',
    name: 'Works',
    iconPath: works,
    selectedIconPath: worksActive,
    meta: {
      title: '作品',
      type: 'secondary',

    },
  },
  {
    path: '/ranking',
    name: 'Ranking',
    iconPath: ranking,
    selectedIconPath: rankingActive,
    meta: {
      title: '排行',
      type: 'secondary',

    },

  },
  {
    path: '/statistics',
    name: 'Statistics',
    iconPath: statistics,
    selectedIconPath: statisticsActive,
    meta: {
      title: '统计',
      type: 'secondary',

    },
  },
]
