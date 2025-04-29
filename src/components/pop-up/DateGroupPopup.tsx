/**
 * * 选择开始时间 - 结束时间
 */

import CommonPopUp from './CommonPopUp'
import { DatePicker, PickerGroup, showToast } from 'vant'
import dayjs from 'dayjs'

const now = dayjs()
console.log('🚀 ~ now:', now.format('YYYY-MM-DD'))
export default defineComponent({
  name: 'DateGroupPopup',
  props: {
    title: { type: String, default: '标题' },
    startDateTime: { type: Array as PropType<Array<string>>, default: () => now.format('YYYY-MM-DD').split('-') },
    endDateTime: { type: Array as PropType<Array<string>>, default: () => now.format('YYYY-MM-DD').split('-') },
    onResolve: { type: Function },
    onReject: { type: Function },
  },
  setup(props) {
    console.log(props)
    const visible = ref(true)

    console.log('🚀 ~ setup ~ props:', props)
    const startDate = ref(props.startDateTime)
    const endDate = ref(props.endDateTime)
    function onConfirm() {
      if (startDate.value > endDate.value) {
        showToast('开始时间不能大于结束时间')
        return
      }
      props.onResolve({ startDate: startDate.value.join('-'), endDate: endDate.value.join('-') })
      visible.value = false
    }
    function onCancel() {
      props.onReject()
      visible.value = false
    }

    return () => (
      <CommonPopUp v-model={visible.value}>
        <PickerGroup
          title={props.title}
          tabs={['开始日期', '结束日期']}
          onConfirm={onConfirm}
          onCancel={onCancel}
        >
          <DatePicker v-model={startDate.value} />
          <DatePicker v-model={endDate.value} />
        </PickerGroup>
      </CommonPopUp>
    )
  },
})
