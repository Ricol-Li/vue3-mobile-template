/**
 * * 活动介绍
 */
import { ActivityTitle } from '@/views/home/components/Common'
import iconDot from '@/assets/images/icons/icon_dot.png'

export default defineComponent({
  name: 'ActivityIntroduction',
  props: {},
  setup() {
    return () => (
      <>
        <ActivityTitle name="活动介绍" />
        <div
          class="rounded-20 bg-#fff p-32"
          style={{ boxShadow: '0px 14px 42px 0px rgba(5,26,121,0.04)' }}
        >
          <div class="text-justify text-30 leading-60">2024年下半年职业院校半年职业院校2024年下半年职业院校半年职业院校2024年下半年职业院校半年职业院校</div>
          <IntroList />
        </div>
      </>
    )
  },
})

const IntroList = defineComponent({
  name: 'IntroList',
  setup() {
    return () => (
      <div class="mt-32">
        {[1, 2, 3].map(() => (
          <IntroListItem />
        ))}
      </div>
    )
  },
})

const IntroListItem = defineComponent({
  name: 'IntroListItem',
  setup() {
    return () => (
      <div class="flex py-32 text-30 border-t-1-#E2E6EB">
        <img class="mt-8 h-24 w-24" src={iconDot} />
        <div class="ml-24 leading-40">
          <div class="text-#333">2024年下半年职业院校半年职业院校2024年下半年职业院校半年职业院校202</div>
          <div class="mt-16 text-24 text-#A9AFB8">2025-10-23</div>
        </div>
      </div>
    )
  },
})
