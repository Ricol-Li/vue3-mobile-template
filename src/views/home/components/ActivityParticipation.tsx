/**
 * * 活动参与情况
 */
import { Button as VanButton } from 'vant'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ActivityParticipation',
  props: {},
  setup() {
    const router = useRouter()

    function handleClick() {
      router.push('/publish/works')
    }

    return () => (
      <div class="mt-32 rounded-20 bg-white p-32 pt-44" style={{ boxShadow: '0px 14px 42px 0px rgba(5,26,121,0.04)' }}>
        <div class="mb-48 flex">
          <ParticipationItem num="6121" desc="人参与" />
          <ParticipationItem
            num="8392"
            desc="件作品"
            style={
              {
                borderLeft: '1px solid #E2E6EB',
                borderRight: '1px solid #E2E6EB',
              }
            }
          />
          <ParticipationItem num="3865" desc="人访问" />
        </div>
        <VanButton block type="primary" onClick={handleClick}>参与活动</VanButton>
      </div>
    )
  },
})

function ParticipationItem(props: { num: string, desc: string, style?: CSSProperties }) {
  const { num, desc, style } = props

  return (
    <div class="flex-center flex-1" style={style}>
      <span class="mr-12 text-#2C68FF">{num}</span>
      <span class="text-24 text-#4E5969">{desc}</span>
    </div>
  )
}
