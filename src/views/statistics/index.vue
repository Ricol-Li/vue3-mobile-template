<script setup lang="ts">
import StatisticsList from './components/StatisticsList'
import type { DataListItem } from './components/StatisticsList'

const statisticsTabList = [
  { title: '全部', key: '1' },
  { title: '江汉区', key: '2' },
  { title: '江岸区', key: '3' },
  { title: '武昌区', key: '4' },
  { title: '洪山区', key: '5' },
  { title: '江夏区', key: '6' },
  { title: '新洲区', key: '7' },
]
const activeTab = ref('1')

const dataList: DataListItem[] = [
  { name: '姜莎影', district: '洪山区', school: '武汉市洪山区鲁巷实验小学建和分', rank: 1, times: 523 },
  { name: '姜莎影', district: '洪山区', school: '武汉市洪山区鲁巷实验小学建和分', rank: 2, times: 523 },
  { name: '姜莎影', district: '洪山区', school: '武汉市洪山区鲁巷实验小学建和分', rank: 3, times: 523 },
  { name: '姜莎影', district: '洪山区', school: '武汉市洪山区鲁巷实验小学建和分', rank: 4, times: 523 },
]
</script>

<template>
  <div>
    <Tab v-model="activeTab" :tab-list="statisticsTabList">
      <StatisticsList :data-list="dataList" />
    </Tab>
  </div>
</template>

<style scoped lang="less"></style>
