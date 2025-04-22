<script setup lang="ts" name="App">
import { useAppStore } from './stores'

const appStore = useAppStore()

console.log(appStore)
</script>

<template>
  <VanConfigProvider>
    <NavBar />
    <RouterView v-slot="{ Component, route }">
      <section class="app-wrapper">
        <Transition name="fade" mode="out-in">
          <KeepAlive :include="['Home']">
            <component :is="Component" :key="route.path" />
          </KeepAlive>
        </Transition>
      </section>
    </RouterView>
    <TabBar />
  </VanConfigProvider>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  position: relative;
}

/* 定义淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
