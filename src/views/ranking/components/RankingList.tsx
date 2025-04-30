/**
 * * 点赞排行榜 & 投票排行榜 & 获奖情况
 */

export interface DataListItem {
  name: string
  district: string
  school: string
  rank: number
  times: number
  [key: string]: any
}

export default defineComponent({
  name: 'RankingList',
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
            {props.activeTab === '1' ? <PrizeItem itemData={item} activeTab={props.activeTab} /> : <RankItem itemData={item} activeTab={props.activeTab} />}
          </ListItem>
        ))}
      </div>
    )
  },
})

const RankItem = defineComponent({
  name: 'RankItem',
  props: {
    itemData: { type: Object as PropType<DataListItem>, default: () => ({}) },
    activeTab: { type: String, required: true },
  },
  setup(props) {
    const { itemData } = props
    const activeTab = computed(() => props.activeTab)
    return () => (
      <div class="border-b-1-#E2E6EB flex pb-32">
        <RankIcon rank={itemData.rank} activeTab={activeTab.value} />
        <div class="ml-16 mr-8px mr-9 flex flex-1 flex-col gap-16 overflow-hidden pt-6px">
          <div class="font-600">{itemData.name}</div>
          <div class="text-28">
            <span>{activeTab.value === '2' ? '被点赞次数：' : '被投票数：'}</span>
            <span>{itemData.times}</span>
          </div>
          <SchoolInfo itemData={itemData} />
        </div>
        <RightArrow />
      </div>
    )
  },
})

const PrizeItem = defineComponent({
  name: 'PrizeItem',
  props: {
    itemData: { type: Object as PropType<DataListItem>, default: () => ({}) },
    activeTab: { type: String, required: true },
  },
  setup(props) {
    const { itemData } = props
    return () => (
      <div class="border-b-1-#E2E6EB flex pb-32">
        <RankIcon rank={itemData.rank} activeTab={props.activeTab} />
        <div class="ml-16 mr-8px mr-9 flex flex-1 flex-col gap-16 overflow-hidden pt-6px">
          <div class="flex items-center font-600">
            <span>{itemData.name}</span>
            {itemData.rank <= 3 ? <NameTag rank={itemData.rank} /> : null}
          </div>
          <SchoolInfo itemData={itemData} />
        </div>
        <RightArrow />
      </div>
    )
  },
})

function SchoolInfo(props: { itemData: DataListItem }) {
  const { itemData } = props
  return (<div class="w-full overflow-hidden text-ellipsis text-nowrap text-28 text-#86909C">{`${itemData.district} · ${itemData.school}`}</div>)
}

const RandImageMap = {
  1: {
    imgUrl: new URL('@/assets/images/icons/first.png', import.meta.url).href,
    nameTagBgStyle: { background: 'linear-gradient( 270deg, #FF5151 0%, #FF8437 100%' },
    prizeName: '一等奖',
  },
  2: {
    imgUrl: new URL('@/assets/images/icons/second.png', import.meta.url).href,
    nameTagBgStyle: { background: 'linear-gradient( 270deg, #98C0D7 0%, #B0D1E5 100%)' },
    prizeName: '二等奖',
  },
  3: {
    imgUrl: new URL('@/assets/images/icons/third.png', import.meta.url).href,
    nameTagBgStyle: { background: 'linear-gradient( 270deg, #EFA774 0%, #F9CCAC 100%)' },
    prizeName: '三等奖',
  },
}

function RankIcon(props: { rank: number, activeTab: string }) {
  const { rank, activeTab } = props
  console.log(activeTab)

  return (
    <div class={`h-56 w-56 flex-center rounded-7 shrink-0 ${rank <= 3 && activeTab !== '1' ? 'bg-#f4f7ff text-#2C68FF' : 'text-#86909C '} `}>
      { (Number(activeTab) === 1 && rank <= 3) ? <RankImage rank={rank} /> : rank }
    </div>
  )
}

function RankImage(props: { rank: number }) {
  const { rank } = props
  return (<img src={RandImageMap[rank].imgUrl} class="h-56 w-56" />)
}

function NameTag(props: { rank: number }) {
  const { rank } = props
  return (
    <div
      class="ml-16 h-36 w-92 rounded-36 text-center text-22 text-#fff font-normal leading-36"
      style={RandImageMap[rank].nameTagBgStyle}
    >
      {RandImageMap[rank].prizeName}
    </div>
  )
}

function RightArrow() {
  return (
    <div class="w-40 flex shrink-0 items-center">
      <img class="h-40 w-40" src="http://minio.zxpt.yqzh.top/public/k12_brain_mobile/static/icons/icon_arrow_right_000@2x.png" />
    </div>
  )
}

export const ListItem = defineComponent({
  name: 'ListItem',
  setup(_, { slots }) {
    return () => (
      <div class="common-section pb-0">{slots.default()}</div>
    )
  },
})
