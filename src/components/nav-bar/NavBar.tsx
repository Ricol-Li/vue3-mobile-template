import { defineComponent } from 'vue'
import { NavBar } from 'vant'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const route = useRoute()
    const router = useRouter()

    console.log('🚀 ~ setup ~ route:', route)
    function handleClickLeft() {
      if (window.history.state.back)
        history.back()
      else
        router.replace('/')
    }

    const showLeftArrow = computed(() => route.name !== 'ActivitySquare')
    const navBarTitle = computed(() => {
      const { meta } = route
      return meta.title as string || '标题'
    })
    return () => (
      <NavBar
        onClickLeft={handleClickLeft}
        left-arrow={showLeftArrow.value}
        title={navBarTitle.value}
        placeholder={true}
        fixed={true}
        z-index="1000"
      >
      </NavBar>
    )
  },
})
