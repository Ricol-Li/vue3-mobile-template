/**
 * * Popup中的Checkbox组件
 * @1 自定义popup的header头，包含标题，取消操作，确认操作
 * @2 支持多选（vant中picker组件不支持多选）
 */

import CommonPopUp from './CommonPopUp'
import { Checkbox, CheckboxGroup } from 'vant'

// 定义 Checkbox 项的类型
interface CheckboxItem {
  value: string | number
  label: string
  disabled?: boolean
}

export default defineComponent({
  name: 'CheckboxPopup',
  props: {
    title: { type: String, default: '标题' },
    onResolve: { type: Function },
    onReject: { type: Function },
    items: { type: Array as PropType<CheckboxItem[]>, default: () => [] },
    selected: { type: Array as PropType<(string | number)[]>, default: () => [] },
  },
  setup(props) {
    const visible = ref(true)
    const selected = ref<Array<string | number>>(props.selected)
    function handleCancel() {
      props.onReject()
      handleClose()
    }

    function handleConfirm() {
      props.onResolve(selected.value)
      handleClose()
    }

    function handleClose() {
      visible.value = false
    }
    function handleUpdate(value: (string | number)[]) {
      selected.value = value
    }

    return () => (
      <CommonPopUp v-model={visible.value}>
        <PopupHeader title={props.title} cancel={handleCancel} confirm={handleConfirm} />
        <CustomCheckboxGroup modelValue={selected.value} onUpdate:modelValue={handleUpdate} items={props.items} />
      </CommonPopUp>
    )
  },
})

// 自定义 CheckboxGroup 组件
export const CustomCheckboxGroup = defineComponent({
  name: 'CustomCheckboxGroup',
  props: {
    modelValue: {
      type: Array as PropType<(string | number)[]>,
      required: true,
    },
    items: {
      type: Array as PropType<CheckboxItem[]>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const checkList = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        updateValue(value)
      },
    })
    function updateValue(value: (string | number)[]) {
      emit('update:modelValue', value)
    }

    return () => (
      <CheckboxGroup
        v-model={checkList.value}
        onChange={updateValue}
        class="p-l-32px"
      >
        {props.items.map(item => (
          <Checkbox
            class="h-104px"
            key={item.value}
            name={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    )
  },
})

export function PopupHeader(props) {
  return (
    <div class="h-116px flex items-center justify-between p-x-32px text-32px leading-none">
      <div onClick={() => props.cancel()}>取消</div>
      <div class="text-34px font-semibold">{props.title}</div>
      <div onClick={() => props.confirm()} class="text-#2C68FF">确定</div>
    </div>
  )
}
