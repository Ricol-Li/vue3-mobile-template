/**
 * * 活动详情页通用组件
 */

export function ActivityTitle(props: { name: string }) {
  const { name } = props

  return (
    <div class="mb-24 mt-32 text-34px text-#272E3B font-600">{name}</div>
  )
}
