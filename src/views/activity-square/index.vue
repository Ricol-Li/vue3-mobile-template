<script setup lang="ts">
const router = useRouter()
function enterActivity() {
  router.push('/home')
}
</script>

<template>
  <div>
    活动广场
    <VanButton @click="enterActivity">
      进入活动
    </VanButton>
  </div>
</template>

<style scoped lang="less">

</style>
