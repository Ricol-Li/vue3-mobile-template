<script setup lang="ts">
import { openPopup } from '@/hooks/usePopup'
import ActivityImageUploader from './components/ActivityImageUploader'
import FooterSubmit from '@/components/footer/FooterSubmit'
import CheckboxPopup from '@/components/pop-up/CheckboxPopup'
import DateGroupPopup from '@/components/pop-up/DateGroupPopup'
import { useActivityStore } from '@/stores'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const activityStore = useActivityStore()
const { activityRule } = storeToRefs(activityStore)

console.log(activityRule)

const isAddActivity = computed(() => {
  return route.params.activityId === '0'
})
console.log('🚀 ~ isAddActivity ~ isAddActivity:', isAddActivity)

const rules = reactive({
  activityName: [{ required: true, message: '请输入活动名称' }],
  activityDesc: [{ required: true, message: '请输入活动介绍' }],
})

interface IFormData {
  activityRange: Array<string | number>
  [key: string]: any
}
const formData = reactive<IFormData>({
  pcImgUrl: [{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }],
  mobileImgUrl: [{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }],
  activityName: '',
  activityDesc: '',
  activityRange: [],
  activityRangeName: '',
  activityStartTime: '',
  activityEndTime: '',
})

function handleSubmit() {

}

const items = [
  { label: '老师', value: '1' },
  { label: '学生/家长', value: '2' },
  { label: '工作人员', value: '3' },
]

// 选择活动对象
async function selectActivityRange() {
  const data = await openPopup<Array<string | number>>({
    component: CheckboxPopup,
    props: {
      title: '活动对象',
      items,
      selected: formData.activityRange,
    },
  })
  formData.activityRange = data
  formData.activityRangeName = data.map(item => items.find(i => i.value === item)?.label).join(',')
}

// 活动时间
const activityTime = computed(() => {
  return formData.activityStartTime && formData.activityEndTime
    ? `${formData.activityStartTime} 至 ${formData.activityEndTime}`
    : ''
})
interface DateGroup {
  startDate: string
  endDate: string
}
// 选择活动时间
async function selectActivityTime() {
  const data = await openPopup<DateGroup>({
    component: DateGroupPopup,
    props: {
      title: '活动时间',
    },
  })
  formData.activityStartTime = data.startDate
  formData.activityEndTime = data.endDate
}
</script>

<template>
  <div pb-178>
    <!-- {{ isAddActivity ? '添加活动' : '编辑活动' }} -->
    <VanForm required @submit="handleSubmit">
      <VanCellGroup mt-16px overflow-hidden pb-32px>
        <VanField
          v-model="formData.activityName" label="活动名称" placeholder="请输入活动名称" required
          :rules="rules.activityName"
        />
        <VanField
          v-model="formData.activityDesc" label="活动介绍" placeholder="请输入活动介绍" required rows="4" autosize
          type="textarea" maxlength="200" show-word-limit :rules="rules.activityDesc" :border="false"
        />
        <AiSupportButton mr-32px />
      </VanCellGroup>

      <div font-600 p-24-32>
        活动宣传图
      </div>

      <ActivityImageUploader
        v-model="formData.pcImgUrl" title="电脑宣传图" :ratio="{ width: 1920, height: 560 }"
        :preview-size="{ width: 275, height: 80 }"
      />
      <ActivityImageUploader
        v-model="formData.mobileImgUrl" title="手机宣传图" :ratio="{ width: 750, height: 350 }"
        :preview-size="{ width: 172, height: 80 }"
      />

      <VanCellGroup mt-24px>
        <VanField v-model="formData.activityRangeName" label="活动范围" is-link readonly @click="selectActivityRange" />
        <VanField v-model="activityTime" label="活动时间" is-link readonly @click="selectActivityTime" />
        <VanField v-model="formData.activityRangeName" label="活动对象" is-link readonly @click="selectActivityRange" />
      </VanCellGroup>

      <div mt-24px common-section>
        <div align-center flex justify-between>
          <span text-32>作品上传</span>
          <span text="32 #2C68FF" @click="router.push('/activity/setting/works-rule')">{{ activityRule.name ? '编辑' : '添加作品附件上传要求' }}</span>
        </div>

        <div mt-28 flex>
          <img src="@/assets/images/common/folder_image.png" h-160 w-160 shrink-0 />
          <div v-show="activityRule.name" text="24 #868F9C" ml-24 flex flex-col justify-around>
            <!-- 作品上传要求 -->
            <div>作品类型名称：{{ activityRule.name }}</div>
            <div>作品格式类型：{{ activityRule.name }}</div>
            <div>作品数量：{{ activityRule.name }}</div>
          </div>
        </div>
      </div>
      <FooterSubmit>
        <VanButton block type="primary" native-type="submit">
          发布
        </VanButton>
      </FooterSubmit>
    </VanForm>
  </div>
</template>

<style scoped lang="less"></style>
