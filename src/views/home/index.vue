<script setup lang="ts">
import ActivityInfo from './components/ActivityInfo'
import ActivityParticipation from './components/ActivityParticipation'
import ActivityFlow from './components/ActivityFlow.vue'
import ActivityIntroduction from './components/ActivityIntroduction'
</script>

<template>
  <div>
    <div class="activity-bg-container">
      <div class="bg-mask"></div>
    </div>
    <div class="p-0-32 -translate-y-28">
      <ActivityInfo />
      <ActivityParticipation />
      <ActivityFlow />
      <ActivityIntroduction />
    </div>
  </div>
</template>

<style scoped lang="less">
.activity-bg-container {
  width: 100%;
  height: 350px;
  background: url('@/assets/images/banner/activity_banner_1.png') center no-repeat;
  background-size: 100% 350px;
  position: relative;
  .bg-mask {
    width: 100%;
    height: 28px;
    background: linear-gradient(180deg, rgba(243, 246, 249, 0) 0%, #f3f6f9 100%);
    position: absolute;
    bottom: 0;
  }
}

.activity-content-container {
  padding: 0 32px;
  transform: translateY(-28px);
}
</style>
