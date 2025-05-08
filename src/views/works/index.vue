<script setup lang="ts">
import WorksList from './components/WorksList'
import type { DataListItem } from './components/WorksList'
import PublishWorksBtn from './components/PublishWorksBtn'

function handleSearch(searchValue) {
  console.log('🚀 ~ handleSearch ~ searchValue:', searchValue)
}

const worksTabList = [
  { title: '最多作品', key: '1' },
  { title: '最热作品', key: '2' },
  { title: '浏览最多', key: '3' },
]
const worksActiveTab = ref('1')

function handleTabChange() {
  studentClassActiveTab.value = worksActiveTab.value
}

const studentClassList = [
  { title: '一年级（1）班', key: '1' },
  { title: '一年级（2）班', key: '2' },
  { title: '一年级（3）班', key: '3' },
  { title: '一年级（4）班', key: '4' },
  { title: '一年级（5）班', key: '5' },
  { title: '一年级（6）班', key: '6' },
]
const studentClassActiveTab = ref('1')

const worksListData = reactive<DataListItem[]>(
  [
    {
      id: '1',
      name: '汤思佳',
      title: '作品名称',
      worksData: ['1', '2', '3', '4'],
      className: '一年级（1）班',
      date: '10月27日',
      rank: 1,
      isVote: true,
      voteNum: 9,
      isLike: true,
      likeNum: 999,
      likeText: '汤思佳、汤思佳、汤思佳、汤思佳佳,汤思佳、汤思佳、汤思佳、汤思佳佳',
      voteText: '汤思佳、汤思佳、汤思佳、汤思佳佳,汤思佳、汤思佳、汤思佳、汤思佳佳',
    },
    {
      id: '2',
      name: '张云林',
      title: '活动作品',
      worksData: ['1'],
      className: '一年级（1）班',
      date: '10月27日',
      rank: 2,
      isVote: false,
      voteNum: 9,
      isLike: true,
      likeNum: 999,
      likeText: '汤思佳、汤思佳、汤思佳、汤思佳佳,汤思佳、汤思佳、汤思佳、汤思佳佳',
      voteText: '汤思佳、汤思佳、汤思佳、汤思佳佳,汤思佳、汤思佳、汤思佳、汤思佳佳',
    },
    {
      id: '3',
      name: '尚达雅',
      title: '五年级(上册):地震中的父与子',
      worksData: ['1'],
      className: '一年级（1）班',
      date: '10月27日',
      rank: 3,
      isVote: true,
      voteNum: 9,
      isLike: false,
      likeNum: 999,
      likeText: '汤思佳、汤思佳、汤思佳、汤思佳佳,汤思佳、汤思佳、汤思佳、汤思佳佳',
      voteText: '汤思佳、汤思佳、汤思佳、汤思佳佳,汤思佳、汤思佳、汤思佳、汤思佳佳',
    },
    {
      id: '4',
      name: '我的名字超长啊哈哈哈哈哈哈哈',
      title: '五年级(上册):地震中的父与子',
      worksData: ['1'],
      className: '一年级（1）班',
      date: '10月27日',
      rank: 3,
      voteNum: 9,
      isVote: false,
      isLike: false,
      likeNum: 999,
      likeText: '汤思佳、汤思佳、汤思佳、汤思佳佳,汤思佳、汤思佳、汤思佳、汤思佳佳',
      voteText: '汤思佳、汤思佳、汤思佳、汤思佳佳,汤思佳、汤思佳、汤思佳、汤思佳佳',
    },
  ],
)
function handleLike(itemData, index) {
  worksListData[index].isLike = !worksListData[index].isLike
  console.log('🚀 ~ handleLike ~ handleLike:', itemData)
}
function handleVote(itemData, index) {
  worksListData[index].isVote = !worksListData[index].isVote
  console.log('🚀 ~ handleVote ~ handleVote:', itemData)
}
const actions = [
  { name: '删除作品' },
  { name: '举报作品' },
]
const show = ref(false)
function onSelect(item) {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  show.value = false
  showToast(item.name)
}
function handleChange(itemData, index) {
  console.log('🚀 ~ handleChange ~ handleChange:', itemData, index)
  show.value = true
}
</script>

<template>
  <div class="works-page" pb-460>
    <HeaderSearch placeholder="搜索活动名称" @search="handleSearch" />
    <Tab v-model="worksActiveTab" :tab-list="worksTabList" :swipeable="false" @change="handleTabChange">
      <VanTabs v-model:active="studentClassActiveTab" :swipeable="true" :animated="true" class="student-class-tabs" type="card">
        <VanTab v-for="item in studentClassList" :key="item.key" :title="item.title">
          <WorksList :data-list="worksListData" :like="handleLike" :vote="handleVote" @change="handleChange" />
        </VanTab>
      </VanTabs>
    </Tab>
    <PublishWorksBtn />
    <VanActionSheet v-model:show="show" :actions="actions" cancel-text="取消" @select="onSelect" />
  </div>
</template>

<style scoped lang="less">
.works-page {
  :deep(.student-class-tabs) {
    background-color: #fff;
    .van-tabs__wrap {
      height: 104px;
    }
    .van-tabs__nav--card {
      height: 100%;
      border: none;
      padding-top: 24px;
      padding-bottom: 24px;
    }
    .van-tab {
      font-size: 24px;
      border: none;
      width: auto;
      flex: none;
      flex-shrink: 0;
      background-color: #f0f2f5;
      border-radius: 8px;
      color: #272e3b;
      padding: 8px 14px;
      margin-left: 24px;
      &:nth-child(1) {
        margin-left: 0;
      }
      &.van-tab--active {
        background: #2c68ff;
        color: #fff;
        font-weight: normal;
      }
    }
  }
}
</style>
