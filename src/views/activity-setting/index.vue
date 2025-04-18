<script setup lang="ts">
const route = useRoute()
const isAddActivity = computed(() => {
  return route.params.activityId === '0'
})
console.log('🚀 ~ isAddActivity ~ isAddActivity:', isAddActivity.value)
</script>

<template>
  <div>
    {{ isAddActivity ? '添加活动' : '编辑活动' }}
  </div>
</template>

<style scoped lang="less">

</style>
