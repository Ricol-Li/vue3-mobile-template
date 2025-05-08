/**
 * * 作品列表组件
 */
import NoData from '@/components/empty/NoData'
import iconMore from '@/assets/images/icons/icon_more.png'
import type { PropType } from 'vue'

export interface DataListItem {
  name: string
  title: string
  worksData: string[]
  className: string
  date: string
  rank: number
  isVote: boolean
  voteNum: number
  isLike: boolean
  likeNum: number
  likeText: string
  voteText: string
  [key: string]: any
}

export default defineComponent({
  name: 'WorksList',
  emits: ['change'],
  props: {
    dataList: { type: Array as PropType<DataListItem[]>, default: () => [] },
    like: { type: Function, default: () => {} },
    vote: { type: Function, default: () => {} },
  },
  setup(props, { emit }) {
    const dataList = computed(() => props.dataList)
    function handleChange(itemData: DataListItem, index: number) {
      emit('change', itemData, index)
    }
    return () => (

      <div class="overflow-y-auto bg-#f5f7fa">
        {
          dataList.value.length
            ? dataList.value.map(
                (item, index) =>
                  (
                    <WorksListItem
                      item-data={item}
                      like={props.like}
                      vote={props.vote}
                      key={item.id}
                      index={index}
                      onChange={handleChange}
                    />
                  ),
              )
            : <NoData />
        }
      </div>
    )
  },
})

export const WorksListItem = defineComponent({
  name: 'WorksListItem',
  emits: ['change'],
  props: {
    itemData: { type: Object as PropType<DataListItem>, default: () => ({}) },
    index: { type: Number, default: 0 },
    like: { type: Function, default: () => {} },
    vote: { type: Function, default: () => {} },
  },
  setup(props, { emit }) {
    const { itemData, like, vote, index } = props
    function handleChange() {
      emit('change', itemData, index)
    }

    function WorksItemHeader(props: { itemData: DataListItem }) {
      const { name, rank } = props.itemData
      return (
        <div class="flex items-center">
          <div class="h-64 w-64 rounded-full bg-red"></div>
          <div class="ml-24 max-w-300 overflow-ellipsis font-500">{name}</div>
          {rank <= 3 ? <PrizeImage rank={props.itemData.rank} /> : null}
          <img src={iconMore} class="ml-auto h-48 w-48" onClick={handleChange} />
        </div>
      )
    }
    return () => (
      <div class="mt-16">
        <div class="common-section">
          <WorksItemHeader itemData={itemData} />
          {/* 活动标题 */}
          <div class="mt-32">{itemData.title}</div>
          {/* 活动内容 */}
          <WorksItemContent itemData={itemData} />
          {/* 日期，班级 */}
          <WorksItemInfo itemData={itemData} />
          {/* 点赞，投票互动 */}
          <WorksItemInteract itemData={itemData} />
        </div>
        <WorksItemFooter itemData={itemData} like={like} vote={vote} index={index} />
      </div>
    )
  },
})
const WorksItemContent = defineComponent({
  name: 'WorksItemContent',
  props: {
    itemData: { type: Object as PropType<DataListItem>, required: true },
  },
  setup(props) {
    const worksData = computed(() => props.itemData.worksData)
    return () => (
      <div class="mt-14 flex flex-wrap justify-between">
        {
          worksData.value.map((item, index) => (
            <div key={index} class="mt-10 h-222 w-222 rounded-12 bg-blue">{item}</div>
          ))
        }
      </div>
    )
  },
})

const imgs = {
  like: new URL('@/assets/images/icons/icon_like.png', import.meta.url).href,
  likeActive: new URL('@/assets/images/icons/icon_like_active.png', import.meta.url).href,
  vote: new URL('@/assets/images/icons/icon_vote.png', import.meta.url).href,
  voteActive: new URL('@/assets/images/icons/icon_vote_active.png', import.meta.url).href,
}

const WorksItemInteract = defineComponent({
  name: 'WorksItemInteract',
  props: {
    itemData: { type: Object as PropType<DataListItem>, required: true },
  },
  setup(props) {
    const { itemData } = props

    function InteractItem(props: { text: string, imgUrl: string, num: number, className?: string }) {
      const { text, imgUrl, num, className } = props
      return (
        <div class={`flex items-center ${className}`}>
          <img class="mr-14 h-28 w-28" src={imgUrl} />
          <div class="mr-16 flex-1 overflow-ellipsis">{text}</div>
          <div class="shrink-0">{`等${num}人点赞`}</div>
        </div>
      )
    }

    return () => (
      <div class="mt-24 rounded-8px bg-#F5F7FA text-24 text-#4E5969 p-16-24">
        <InteractItem imgUrl={imgs.like} text={itemData.likeText} num={itemData.likeNum} />
        <InteractItem className="mt-24" imgUrl={imgs.vote} text={itemData.voteText} num={itemData.voteNum} />
      </div>
    )
  },
})

// 作品栏footer，点赞或者投票
export const WorksItemFooter = defineComponent({
  name: 'WorksItemFooter',
  props: {
    itemData: { type: Object as PropType<DataListItem>, default: () => ({}) },
    index: { type: Number, default: 0 },
    like: { type: Function, default: () => {} },
    vote: { type: Function, default: () => {} },
  },
  setup(props) {
    const { itemData, like, vote } = props

    const likeImg = computed(() => itemData.isLike ? imgs.likeActive : imgs.like)
    const voteImg = computed(() => itemData.isVote ? imgs.voteActive : imgs.vote)
    function handleLike() {
      like(itemData, props.index)
    }

    function handleVote() {
      vote(itemData, props.index)
    }

    function FooterItem(props) {
      const { name, imgUrl, type } = props

      return (
        <div class={`${itemData[type] ? 'text-#FF7D00 ' : ''} flex-center`} onClick={props.onClick}>
          <img src={imgUrl} class="mr-8 h-32 w-32" />
          <span>{name}</span>
        </div>
      )
    }

    return () => (
      <div class="flex justify-between bg-#fff text-28 p-20-140 border-t-1-#E2E6EB">
        <FooterItem type="isLike" imgUrl={likeImg.value} name="点赞" onClick={handleLike} />
        <FooterItem type="isVote" imgUrl={voteImg.value} name="投票" onClick={handleVote} />
      </div>
    )
  },

})

function WorksItemInfo(props) {
  const { itemData } = props
  return (
    <div class="mt-24 flex-center justify-between">
      <div class="text-28 text-#868F9C">{`${itemData.date} · ${itemData.className}`}</div>
    </div>
  )
}

const PrizeImageMap = {
  1: {
    imgUrl: new URL('@/assets/images/icons/first.png', import.meta.url).href,
    nameTagBgStyle: { background: 'linear-gradient( 270deg, #FF5151 0%, #FF8437 100%' },
    prizeName: '一等奖作品',
  },
  2: {
    imgUrl: new URL('@/assets/images/icons/second.png', import.meta.url).href,
    nameTagBgStyle: { background: 'linear-gradient( 270deg, #98C0D7 0%, #B0D1E5 100%)' },
    prizeName: '二等奖作品',
  },
  3: {
    imgUrl: new URL('@/assets/images/icons/third.png', import.meta.url).href,
    nameTagBgStyle: { background: 'linear-gradient( 270deg, #EFA774 0%, #F9CCAC 100%)' },
    prizeName: '三等奖作品',
  },
}

function PrizeImage(props) {
  const { rank } = props
  return (
    <div class="ml-24 flex items-center">
      <img class="z-10 mr-[-28px] w-48" src={PrizeImageMap[rank].imgUrl} />
      <div style={PrizeImageMap[rank].nameTagBgStyle} class="h-36 flex-center shrink-0 rounded-28 px-24 text-24 text-#fff">{PrizeImageMap[rank].prizeName}</div>
    </div>
  )
}
