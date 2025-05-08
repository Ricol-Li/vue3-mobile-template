/**
 * * 暂无数据
 */
import NoDataImg from '@/assets/images/common/no_data.png'

export default defineComponent({
  name: 'NoData',
  setup() {
    return () => (
      <div class="flex flex-col items-center p-y-100">
        <img src={NoDataImg} class="h-240 w-240" />
        <span class="text-28 text-#969799">暂无数据</span>
      </div>
    )
  },
})
