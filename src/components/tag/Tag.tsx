/**
 * * 标签组件
 */

export default defineComponent({
  name: 'Tag',
  props: {
    type: { type: String as PropType<'warning' | 'primary'>, default: 'warning' },
    text: { type: String, default: '报名中' },
    color: { type: String, default: '#f0f0f0' },
  },
  setup(props: { type: 'warning' | 'primary', text: string, color: string }) {
    const tagStyleMap = {
      warning: 'bg-#FFF6E6 text-#FF7D00',
      primary: 'bg-#E8F2FF text-#2C68FF',
    }
    return () => (
      <div class={`${tagStyleMap[props.type]} px-16px py-8px line-height-33px text-24px rounded-6px inline-block flex-shrink-0 flex-grow-0`}>
        {props.text}
      </div>
    )
  },
})
