<!-- * 活动作品规则新增或编辑 -->
<script setup lang="ts">
import FooterSubmit from '@/components/footer/FooterSubmit'

function handleSubmit() {

}
const rules = reactive({
  activityName: [{ required: true, message: '请输入作品类型名称' }],
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
  checked: '1',
  numChecked: '1',
})
const worksTypeList = [
  {
    id: '0',
    desc: '全部：支持下面所有类型',
  },
  {
    id: '1',
    desc: '图片：支持jpg、jpeg、png、gif、bmp、tif、tiff格式',
  },
  {
    id: '2',
    desc: '音频：支持mp3、wav格式',
  },
  {
    id: '3',
    desc: '视频：支持mp4格式',
  },
  {
    id: '4',
    desc: '文档：支持doc、docx、xls、xlsx、ppt、pptx、pdf格式',
  },
  {
    id: '5',
    desc: '压缩包：支持zip、rar、7z格式',
  },
]
// 作品数量
const worksNumList = [
  {
    id: '0',
    desc: '不限制',
  },
  {
    id: '1',
    desc: '每人最多1件',
  },
  {
    id: '2',
    desc: '每人最多3件',
  },
  {
    id: '3',
    desc: '每人最多9件',
  },

]
</script>

<template>
  <div class="activity-works-rule" common-page>
    <VanForm required @submit="handleSubmit">
      <VanField
        v-model="formData.activityName"
        label="作品类型名称"
        placeholder="请输入作品类型名称"
        required
        label-width="auto"
        mt-16
        p-32px
        :border="false"
        :rules="rules.activityName"
      />
      <VanField mt-24px label="作品格式类型" label-align="top" :border="false">
        <template #input>
          <VanRadioGroup v-model="formData.checked">
            <VanRadio v-for="type in worksTypeList" :key="type.id" :name="type.id" h-104px leading-45>
              {{ type.desc }}
            </VanRadio>
          </VanRadioGroup>
        </template>
      </VanField>

      <VanField mt-24px label="作品数量" label-align="top" :border="false">
        <template #input>
          <VanRadioGroup v-model="formData.numChecked">
            <VanRadio v-for="type in worksNumList" :key="type.id" :name="type.id" h-104px leading-45>
              {{ type.desc }}
            </VanRadio>
          </VanRadioGroup>
        </template>
      </VanField>

      <FooterSubmit>
        <VanButton block type="primary" native-type="submit">
          保存
        </VanButton>
      </FooterSubmit>
    </VanForm>
  </div>
</template>

 <style scoped lang="less">
.activity-works-rule {
  :deep(.van-cell) {
    padding: 32px;
    padding-right: 0;
  }
}
</style>
