<!-- * 活动流程 -->
<script lang="ts" setup>
import { ActivityTitle } from './Common'
// import Swiper core and required components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// 示例滑块数据
const slides = [
  {
    title: 'Slide 1',
    description: '这是第一个滑块的描述。',
  },
  {
    title: 'Slide 2',
    description: '这是第二个滑块的描述。',
  },
  {
    title: 'Slide 3',
    description: '这是第三个滑块的描述。',
  },
  {
    title: 'Slide 4',
    description: '这是第四个滑块的描述。',
  },
  {
    title: 'Slide 5',
    description: '这是第五个滑块的描述。',
  },
  {
    title: 'Slide 6',
    description: '这是第六个滑块的描述。',
  },

]

// Swiper 初始化回调
function onSwiper(swiper) {
  console.log('Swiper initialized:', swiper)
}

// 滑块切换回调
function onSlideChange(swiper) {
  console.log('Slide changed to:', swiper.activeIndex)
}
</script>

<template>
  <div>
    <ActivityTitle name="活动流程" />
    <div class="rounded-20 bg-#fff py-46 shadow-[0px_14px_42px_0px_rgba(5,26,121,0.04)]">
      <Swiper
        :slides-per-view="3"
        :space-between="10"
        :loop="false"
        class="my-swiper rounded-lg"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <div class="slide-content rounded-lg bg-white">
            <div>{{ slide.title }}</div>
            <div>{{ slide.description }}</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
