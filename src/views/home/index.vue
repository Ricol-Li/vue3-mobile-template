<script setup lang="ts">
import { Icon } from '@iconify/vue'

const router = useRouter()
function handleEditActivity() {
  router.push('/activity/setting/1')
}
</script>

<template>
  <div>
    <Icon icon="fluent-emoji:accordion" />
    活动首页
    <VanButton @click="handleEditActivity">
      编辑活动
    </VanButton>
  </div>
</template>

<style scoped lang="less">

</style>
