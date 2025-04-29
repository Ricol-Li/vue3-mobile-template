/**
 * * 添加活动按钮，固定在页面右下角
 */

export default defineComponent({
  name: 'AddActivityButton',
  props: {
    to: { type: String, default: '/activity/setting/0' },
  },
  setup(props) {
    const router = useRouter()
    function handleClick() {
      router.push(props.to)
    }
    return () => (
      <div
        onClick={handleClick}
        class="8px 20px 0px rgba(5,26,121,0.1)) shadow-(0px fixed bottom-144px right-32px h-96px w-96px flex-center rounded-full bg-#2C68FF"
      >
        <img class="h-40px w-40px" src="http://minio.zxpt.yqzh.top/public/k12_brain_mobile/static/icons/icon_add_white.png" />
      </div>
    )
  },
})
