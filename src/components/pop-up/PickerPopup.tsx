/**
 * * Picker组件封装
 */
import CommonPopUp from './CommonPopUp'
import { Picker } from 'vant'
import type { PickerOption } from 'vant'

export default defineComponent({
  name: 'PickerPopup',
  props: {
    title: { type: String, default: '标题' },
    confirmButtonText: { type: String, default: '确定' },
    cancelButtonText: { type: String, default: '取消' },
    onResolve: { type: Function, default: () => {} },
    onReject: { type: Function, default: () => {} },
    onClosed: { type: Function, default: () => {} },
    columns: { type: Array, default: () => [] },
    currentValue: { type: Array as PropType<Array<string | number>>, required: true },
  },
  setup(props) {
    const visible = ref(true)
    console.log('🚀 ~ PickerPopup ~ props:', props)
    function handleConfirm({ selectedValues, selectedOptions, selectedIndexes }) {
      console.log(selectedValues, selectedOptions, selectedIndexes)
      props.onResolve({ result: true, selectedValues, selectedOptions, selectedIndexes })
      handleClose()
    }
    function handleCancel({ selectedValues, selectedOptions, selectedIndexes }) {
      console.log(selectedValues, selectedOptions, selectedIndexes)
      props.onReject({ result: false, selectedValues, selectedOptions, selectedIndexes })
      handleClose()
    }

    function handleClose() {
      visible.value = false
    }
    function handleClosed() {
      props.onClosed()
    }

    return () => (
      <CommonPopUp v-model={visible.value} onClosed={handleClosed}>
        <Picker
          model-value={props.currentValue}
          columns={props.columns}
          title={props.title}
          confirm-button-text={props.confirmButtonText}
          cancel-button-text={props.cancelButtonText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          v-slots={{
            option: (item: PickerOption) => <PickerOptions option={item} />,
          }}
        >
        </Picker>
      </CommonPopUp>
    )
  },
})

function PickerOptions({ option }) {
  console.log(option)
  return (
    <div key={option.value}>{option.text}</div>
  )
}
