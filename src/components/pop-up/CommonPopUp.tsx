/**
 * * 封装Popup组件，使用函数打开，支持promise
 * @1 使用hooks/usePopup/openPopup打开弹窗
 * @2 后续其他popup组件，都是基于这个组件封装
 */

import { Popup as VanPopup } from 'vant'
import type { JSX } from 'vue/jsx-runtime'

// 定义插槽类型
interface DialogSlots {
  default?: () => JSX.Element
}

interface Context {
  slots: DialogSlots
  [key: string]: any
}

export default defineComponent({
  name: 'CommonPopUp',
  emits: ['closed', 'update:modelValue'],
  props: ['modelValue'],

  setup(props, { slots, emit }: Context) {
    function handleClose() {
      emit('update:modelValue', false)
    }
    function handleClosed() {
      emit('closed')
    }
    return () => (
      <VanPopup
        round
        destroy-on-close={true}
        close-on-popstate={true}
        lazy-render={true}
        safe-area-inset-bottom={true}
        transition-appear={true}
        closeOnClickOverlay
        teleport="#app"
        position="bottom"
        show={props.modelValue}
        v-slots={{ default: slots.default ? () => slots.default?.() : undefined }}
        onClosed={handleClosed}
        onClose={handleClose}
        onClickOverlay={handleClose}
      />

    )
  },
})
