/**
 * * 标签页
 */
import { Tab as VanTab, Tabs as VanTabs } from 'vant'
import './tab.less'

export default defineComponent({
  name: 'Tab',
  emits: ['update:active', 'change'],
  props: {
    tabList: { type: Array, default: () => [] },
    active: { type: String, default: '1' },
    swipeable: { type: Boolean, default: true },
  },

  setup(props, { slots, emit }) {
    function handleChange(name: string, title: string) {
      emit('update:active', name)
      emit('change', name, title)
    }
    return () => (
      <VanTabs active={props.active} swipeable={props.swipeable} animated={true} lazy-render={true} class="custom-van-tabs" onChange={handleChange}>
        {
          props.tabList.map((item: any) => (
            <VanTab title={item.title} key={item.key} name={item.key}>
              {{
                default: () => (slots.default ? slots.default() : null),
              }}
            </VanTab>
          ))
        }
      </VanTabs>
    )
  },
})
