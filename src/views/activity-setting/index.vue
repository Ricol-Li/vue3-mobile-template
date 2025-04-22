<script setup lang="ts">
const route = useRoute()
const isAddActivity = computed(() => {
  return route.params.activityId === '0'
})
const rules = reactive({
  activityName: [{ required: true, message: '请输入活动名称' }],
  activityDesc: [{ required: true, message: '请输入活动介绍' }],
})
const formData = reactive({
  activityName: '',
  activityDesc: '',
  activityStartTime: '',
  activityEndTime: '',
})
console.log('🚀 ~ isAddActivity ~ isAddActivity:', isAddActivity.value)

function handleSubmit() {

}
</script>

<template>
  <div>
    <!-- {{ isAddActivity ? '添加活动' : '编辑活动' }} -->
    <VanForm required @submit="handleSubmit">
      <VanCellGroup mt-16px overflow-hidden pb-32px>
        <VanField
          v-model="formData.activityName"
          label="活动名称"
          placeholder="请输入活动名称"
          required
          :rules="rules.activityName"
        />
        <VanField
          v-model="formData.activityDesc"
          label="活动介绍"
          placeholder="请输入活动介绍"
          required
          rows="4"
          autosize
          type="textarea"
          maxlength="200"
          show-word-limit
          :rules="rules.activityDesc"
          :border="false"
        />
        <AiSupportButton mr-32px />
      </VanCellGroup>
      <div>活动宣传图</div>

      <VanCellGroup />

      <div fixed bottom-0 w-full bg-white p-x-32px p-b-29px p-t-20px>
        <VanButton block type="primary" native-type="submit">
          发布
        </VanButton>
      </div>
    </VanForm>
  </div>
</template>

<style scoped lang="less">

</style>
