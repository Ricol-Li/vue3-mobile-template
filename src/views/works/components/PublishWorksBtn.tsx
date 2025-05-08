/**
 * * 发布作品入口按钮
 */

import PublishWorksBtn from '@/assets/images/common/publish_works.png'

export default defineComponent({
  name: 'PublishWorksBtn',
  setup() {
    const router = useRouter()
    function handleClick() {
      router.push('/publish/works')
    }
    return () => (
      <div class="fixed bottom-179 right-0 h-136 w-172" onClick={handleClick}>
        <img src={PublishWorksBtn} class="h-full w-full" />
        <div class="absolute right-24 top-[50%] flex flex-col translate-y-[-50%] items-center justify-center text-26 text-white">
          <div>发布</div>
          <div>作品</div>
        </div>
      </div>
    )
  },
})
