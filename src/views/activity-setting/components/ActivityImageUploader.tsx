/**
 * * 活动图片上传
 */
import type { UploaderFileListItem } from 'vant'
import { Icon as VanIcon, Uploader as VanUploader } from 'vant'
import type { PropType } from 'vue'

interface IRatio {
  width: number
  height: number
}

export default defineComponent ({
  name: 'ActivityImageUploader',
  emits: ['update:modelValue'],
  props: {
    title: { type: String, required: true },
    modelValue: { type: Array as PropType<any[]>, default: () => [] },
    ratio: { type: Object as PropType<IRatio>, required: true },
    previewSize: { type: Object as PropType<IRatio>, required: true },
    maxCount: { type: Number, default: 1 },
  },
  setup(props, { emit }) {
    const fileList = ref<UploaderFileListItem[]>(props.modelValue)

    function handleChange(file: UploaderFileListItem) {
      console.log(file)
      console.log(fileList.value)
      emit('update:modelValue', fileList.value)
    }

    function handleDelImg(file: UploaderFileListItem, extraFile: any) {
      console.log(file)
      console.log(fileList.value)
      fileList.value = fileList.value.splice(extraFile.index, 1)
      emit('update:modelValue', fileList.value)
    }
    return () => (
      <div class="common-section">
        <div class="text-32px leading-40px">
          {props.title}
        </div>
        <div class="mt-24px text-24px text-#868F9C leading-32px">
          {`建议尺寸${props.ratio.width}*${props.ratio.height}px`}
        </div>
        <VanUploader
          v-model={fileList.value}
          after-read={handleChange}
          onDelete={handleDelImg}
          maxCount={props.maxCount}
          upload-icon="plus"
          class="mt-24px"
          preview-size={[props.previewSize.width, props.previewSize.height]}
        >
          <UploaderDefault />
        </VanUploader>
      </div>
    )
  },
})

function UploaderDefault() {
  return (
    <div class="h-160px w-160px flex-center rounded-12px bg-#F5F7FA">
      <VanIcon name="plus" size="40px" color="#a9afb8"></VanIcon>
    </div>
  )
}
