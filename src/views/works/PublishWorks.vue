<script lang="ts" setup>
import FooterSubmit from '@/components/footer/FooterSubmit'
import PickerPopup from '@/components/pop-up/PickerPopup'
import type { PickerConfirmEventParams, UploaderFileListItem } from 'vant'
import { openPopup } from '@/hooks/usePopup'

interface IFormData {
  activityRange: Array<string | number>
  group: string | number
  groupName: string | number
  [key: string]: any
}
const formData = reactive<IFormData>({
  pcImgUrl: [{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }],
  mobileImgUrl: [{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }],
  group: '',
  groupName: '',
  activityName: '',
  activityDesc: '',
  activityRange: [],
  activityRangeName: '',
  activityStartTime: '',
  activityEndTime: '',
})

const rules = reactive({
  activityName: [{ required: true, message: '请输入活动名称' }],
  activityDesc: [{ required: true, message: '请输入活动介绍' }],
})

const columns = [
  { text: '小学组', value: '1' },
  { text: '初中组', value: '2' },
  { text: '高中组', value: '3' },
]

async function handleSelectGroup() {
  const data = await openPopup<PickerConfirmEventParams>({
    component: PickerPopup,
    props: {
      title: '选择分组',
      columns,
      currentValue: [formData.group || '1'],
    },
  })
  formData.group = data.selectedOptions[0].value
  formData.groupName = data.selectedOptions[0].text
  console.log('data', data)
}

const uploadList = ref([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
])
</script>

<template>
  <div common-page>
    <VanForm label-width="110px">
      <VanCellGroup mt-16px overflow-hidden>
        <VanField
          v-model="formData.activityName"
          label="作品名称" placeholder="请输入作品名称"
          required :rules="rules.activityName"
        />
        <VanField
          v-model="formData.groupName"
          label="作品分组" placeholder="请选择作品分组"
          required is-link readonly
          @click="handleSelectGroup"
        />
        <VanField
          v-model="formData.activityName"
          label="参与人手机号" placeholder="请输入手机号"
          type="tel"
          required :rules="rules.activityName"
        />
      </VanCellGroup>

      <VanCellGroup mt-16px>
        <VanField label-align="top">
          <template #label>
            <div>
              <div class="mr-8px">
                <span class="text-#ee0a24">*</span>上传附件
              </div>
              <div text="#A9AFB8 24">
                支持扩展名：.rar .zip .doc .docx .pdf .jpg .png...
              </div>
            </div>
          </template>
          <template #input>
            <VanUploader v-model="uploadList" accept=".doc,.docx,image/*,.rar,.zip,pdf" class="custom-van-uploader">
              <!-- 上传文件列表slot -->
              <template #preview-cover="item:UploaderFileListItem">
                {{ item?.file?.name ?? '' }}
              </template>
              <template #preview-delete>
                <img src="@/assets/images/icons/icon_delete_gray.png" h-40 w-40 />
              </template>
              <div class="h-160px w-160px flex-center rounded-12px bg-#F5F7FA">
                <VanIcon name="plus" size="40px" color="#a9afb8" />
              </div>
            </VanUploader>
          </template>
        </VanField>
      </VanCellGroup>

      <FooterSubmit>
        <VanButton block type="primary" native-type="submit">
          提交
        </VanButton>
      </FooterSubmit>
    </VanForm>
  </div>
</template>

<style lang="less" scoped>
.custom-van-uploader {
  width: 100%;
  :deep(.van-uploader__wrapper) {
    display: block;
    width: 100%;
    .van-uploader__preview {
      width: 100%;
      height: 104px;
      background: #f5f7fa;
      border-radius: 8px;
      border: 1px solid #e2e6eb;
      margin-bottom: 24px;
      .van-uploader__preview-image,
      .van-uploader__file {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        padding-left: 24px;
        flex-direction: row;
        img {
          width: 64px;
          height: 64px;
        }
        .van-uploader__preview-cover {
          position: static;
          margin-left: 16px;
          width: 480px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .van-uploader__file-name {
          margin-top: 0;
          color: #272e3b;
          font-size: 28px;
          text-align: left;
          margin-left: 16px;
        }
      }
      .van-uploader__file {
        .van-badge__wrapper {
          width: 64px;
          height: 64px;
          background: url('@/assets/images/icons/icon_doc_file.png') center no-repeat;
          background-size: 100% 100%;
          &::before {
            display: none;
          }
        }
        .van-uploader__preview-cover {
          display: none;
        }
      }

      // 删除按钮
      .van-uploader__preview-delete {
        width: 40px;
        height: 40px;
        top: 50%;
        transform: translateY(-50%);
        right: 32px;
      }
    }
  }
}
</style>
