/**
 * * AI帮写按钮
 */
import iconAiSupport from '@/assets/images/icons/icon_ai_support.png'

export default defineComponent({
  name: 'AiSupportButton',
  setup() {
    return () => (
      <div
        class="float-end h-64px w-170px flex-center rounded-12px bg-red text-28px text-#fff"
        style={{ background: 'linear-gradient( 270deg, #4B75FF 0%, #AA9EF8 100%)' }}
      >
        <img src={iconAiSupport} class="mr-8px h-32 w-32" />
        AI帮写
      </div>
    )
  },

})
