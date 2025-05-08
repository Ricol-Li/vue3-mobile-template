/**
 * * 活动信息
 */
import iconClock from '@/assets/images/icons/icon_clock.png'
import iconSchool from '@/assets/images/icons/icon_school.png'
import { showConfirmDialog, showToast } from 'vant'

export default defineComponent({
  name: 'ActivityInfo',
  props: {},
  setup() {
    return () => (
      <div class="rounded-20 bg-white p-32" style={{ boxShadow: '0px 14px 42px 0px rgba(5,26,121,0.04)' }}>
        <div class="mb-32 text-34 text-#1D2129 font-600 leading-48">
          拒绝网络成瘾，安全文明上网拒绝网络成瘾，安全文明上网
        </div>
        <div class="flex-center justify-start text-28 text-#4E5969 leading-40">
          <img class="mr-24 h-28 w-28" src={iconClock} />
          活动时间: 11月12日-12月11日
        </div>
        <div class="mt-16 flex-center justify-start text-28 text-#4E5969 leading-40">
          <img class="mr-24 h-28 w-28" src={iconSchool} />
          举办单位: 武汉市教育局
        </div>
        <InfoFooter />
      </div>
    )
  },
})

const InfoFooter = defineComponent({
  name: 'InfoFooter',
  setup() {
    const router = useRouter()
    function handleEditActivity() {
      router.push('/activity/setting/1')
    }
    async function handleOffline() {
      await showConfirmDialog({
        title: '确认下线活动吗？',
        message:
          '活动下线后用户将无法参加活动',
      })
      showToast('下线成功')
    }

    async function handleDelete() {
      await showConfirmDialog({
        title: '确认删除活动吗？',
        message:
          '活动删除后将无法恢复',
      })
      showToast('下线成功')
    }
    return () => (
      <div class="mt-32 flex pt-32 border-t-1-#E2E6EB">
        <HandleButton name="下线" onClick={handleOffline} />
        <HandleButton name="编辑" onClick={handleEditActivity} className="ml-auto mr-23" />
        <HandleButton name="删除" onClick={handleDelete} className="text-#F53F3F" />
      </div>
    )
  },
})

const HandleButton = defineComponent({
  name: 'HandleButton',
  emits: ['click'],
  props: {
    name: { type: String, required: true },
    className: { type: String, default: '' },
  },
  setup(props, { emit }) {
    const { name } = props
    function handleClick() {
      emit('click')
    }
    return () => (
      <div onClick={handleClick} class={`flex-center rounded-12 p-12-24 text-28 border-1-#C9CDD4 ${props.className}`}>
        {name}
      </div>
    )
  },
})
