/**
 * 页面底部区域，包裹着提交按钮
 */
export default defineComponent({
  name: 'FooterSubmit',
  props: {},
  setup(_, { slots }) {
    return () => (
      <div class="fixed bottom-0 w-full bg-white p-x-32 p-b-29 p-t-20">
        {slots.default()}
      </div>
    )
  },
})
