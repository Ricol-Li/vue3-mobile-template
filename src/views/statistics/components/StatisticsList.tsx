/**
 * * 活动广场统计列表
 */
import { ListItem } from '../../ranking/components/RankingList'

export interface DataListItem {
  name: string
  district: string
  school: string
  rank: number
  times: number
  [key: string]: any
}
export default defineComponent({
  name: 'StatisticsList',
  props: {
    dataList: { type: Array as PropType<DataListItem[]>, default: () => [] },
    activeTab: { type: String, default: '1' },
  },
  setup(props) {
    console.log(props)
    return () => (
      <div class="mt-16">
        {props.dataList.map((item, index) => (
          <ListItem key={index}>
            <StatisticsItem itemData={item} />
          </ListItem>
        ))}
      </div>
    )
  },
})

const StatisticsItem = defineComponent({
  name: 'PrizeItem',
  props: {
    itemData: { type: Object as PropType<DataListItem>, default: () => ({}) },
  },
  setup(props) {
    const { itemData } = props
    return () => (
      <div class="relative flex pb-32 border-b-1-#E2E6EB">
        <RankIcon rank={itemData.rank} />
        <div class="ml-16 mr-8px mr-9 flex flex-1 flex-col overflow-hidden pt-6px text-30">
          <div class="flex items-center font-600">{itemData.school}</div>
          <div class="mt-32 flex text-28 text-#86909C">
            <div class="flex-1">{`参与人数：${itemData.times}`}</div>
            <div class="flex-1">{`作品数：${itemData.times}`}</div>
          </div>
        </div>
        <div class="absolute right-0 top-0 rounded-6 text-24 p-8-16 border-1-#C9CDD4">{itemData.district}</div>
      </div>
    )
  },
})

function RankIcon(props: { rank: number }) {
  const { rank } = props

  return (
    <div class="h-56 w-56 flex-center shrink-0 rounded-7 text-#86909C">
      { rank }
    </div>
  )
}
