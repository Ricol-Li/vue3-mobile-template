/**
 * * 活动相关的Store
 */

const useActivityStore = defineStore('activity', () => {
  const activityRule = reactive({
    name: '11', // 作品名称
    type: '', // 作品格式类型
    typeDesc: '', // 作品格式类型描述
    num: '', // 作品数量
    numDesc: '', // 作品数量描述
  })
  return {
    activityRule,
  }
})

export default useActivityStore
