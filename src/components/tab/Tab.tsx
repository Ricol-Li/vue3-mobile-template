/**
 * * 标签页
 */
import { Tab as VanTab, Tabs as VanTabs } from 'vant'
import './tab.less'

export default defineComponent({
  name: 'Tab',
  props: {
    tabList: { type: Array, default: () => [] },
  },

  setup(props, { slots }) {
    return () => (
      <VanTabs swipeable={true} animated={true} class="custom-van-tabs">
        {
          props.tabList.map((item: any) => (
            <VanTab title={item.title} key={item.key}>
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
