<script setup lang="ts">
import RankingList from './components/RankingList'
import type { DataListItem } from './components/RankingList'

const rankingTabList = [
  {
    title: '获奖情况',
    key: '1',
  },
  {
    title: '点赞排行',
    key: '2',
  },
  {
    title: '投票排行',
    key: '3',
  },
]

const dataList: DataListItem[] = [
  { name: '姜莎影', district: '洪山区', school: '武汉市洪山区鲁巷实验小学建和分校和分校', rank: 1, times: 523 },
  { name: '姜莎影', district: '洪山区', school: '武汉市洪山区鲁巷实验小学建和分', rank: 2, times: 523 },
  { name: '姜莎影', district: '洪山区', school: '武汉市洪山区鲁巷实验小学建和分', rank: 3, times: 523 },
  { name: '姜莎影', district: '洪山区', school: '武汉市洪山区鲁巷实验小学建和分', rank: 4, times: 523 },
]

const activeTab = ref('1')
</script>

<template>
  <div>
    <Tab v-model:active="activeTab" :tab-list="rankingTabList">
      <RankingList :data-list="dataList" :active-tab="activeTab" />
    </Tab>
  </div>
</template>

<style scoped lang="less"></style>
