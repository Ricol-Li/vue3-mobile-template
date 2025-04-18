<script setup lang="ts">
function handleSearch(value: string) {
  console.log('🚀 ~ handleSearch ~ value:', value)
}

const tabList = [
  {
    title: '我发布的',
    key: '1',
  },
  {
    title: '我参与的',
    key: '2',
  },
]

const activityList = ref([
  {
    title: '2024年宜昌市“基础教育精品课”遴选活动',
    name: '朱平秀',
    orgName: '安徽省科学教育研究院',
    status: 'warning',
    imgUrl: new URL('@/assets/images/banner/activity_banner_1.png', import.meta.url).href,
  },
  {
    title: '2024年宜昌市“基础教育精品课”遴选活动',
    name: '朱平秀',
    orgName: '安徽省科学教育研究院',
    status: 'primary',
    imgUrl: new URL('@/assets/images/banner/activity_banner_2.png', import.meta.url).href,
  },
])
</script>

<template>
  <div>
    <HeaderSearch placeholder="搜索活动名称" @search="handleSearch" />
    <Tab :tab-list="tabList">
      <ActivityList :activity-list="activityList" />
    </Tab>
    <AddActivityButton />
  </div>
</template>

<style scoped lang="less">

</style>
