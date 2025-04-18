/**
 * * 活动列表，活动列表单元
 */

import Tag from '@/components/tag/Tag'

export default defineComponent({
  name: 'ActivityList',
  props: {
    activityList: { type: Array, default: () => [] },
  },
  setup(props) {
    return () => (
      <div class="flex flex-col items-center justify-center">
        {
          props.activityList.map((item: any) => (
            <ActivityListItem activityListItem={item} />
          ))
        }
      </div>
    )
  },

})

export const ActivityListItem = defineComponent({
  name: 'ActivityListItem',
  props: {
    activityListItem: { type: Object, default: () => {}, required: true },
  },
  setup(props) {
    const { activityListItem } = props
    const router = useRouter()
    function handleClick() {
      router.push('/home')
    }
    return () => (
      <div onClick={handleClick} class="mt-32px h-498px w-686px overflow-hidden rounded-20px bg-white">
        <div class="h-320px bg-blue">
          <img class="h-320px w-full" src={activityListItem.imgUrl} />
        </div>
        <div class="p-32px line-height-42px">
          <div class="truncate text-32px text-#272E3B font-medium">{activityListItem.title}</div>
          <div class="mt-24px h-48px flex items-center justify-between">
            <div class="text-24px text-#868F9C">
              {`${activityListItem.name} · ${activityListItem.orgName}`}
            </div>
            <Tag type={activityListItem.status} />
          </div>
        </div>
      </div>
    )
  },

})
