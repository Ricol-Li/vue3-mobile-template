import { defineComponent } from 'vue'
import { NavBar } from 'vant'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const route = useRoute()
    console.log('🚀 ~ setup ~ route:', route)

    const navBarTitle = computed(() => {
      const { meta } = route
      return meta.title as string || '标题'
    })
    return () => (
      <NavBar title={navBarTitle.value} placeholder={true} fixed={true} z-index="1000"></NavBar>
    )
  },
})
