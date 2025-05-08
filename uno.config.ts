import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig, presetAttributify, presetMini } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
    presetAttributify(),
    // 为什么要用到这个插件？
    // 模板使用 viewport 作为移动端适配方案，unocss 默认单位为 rem
    // 所以需要转成 px，然后由 postcss 把 px 转成 vw/vh，完成适配
    presetRemToPx({
      // 这里为什么要设置基础字体大小？看下面这篇文章
      // https://juejin.cn/post/7262975395620618298
      baseFontSize: 4,
    }),
  ],
  rules: [
    [/^p-(\d+)-(\d+)$/, ([, y, x]) => ({ padding: `${Number(y)}px ${Number(x)}px` })],
    // 你也可以让它更灵活，比如允许动态宽度：
    [/^border-b-(\d+)-(.+)$/, ([_, num, color]) => ({ 'border-bottom': `${num}px solid ${color}` })],
    [/^border-t-(\d+)-(.+)$/, ([_, num, color]) => ({ 'border-top': `${num}px solid ${color}` })],
    [/^border-(\d+)-(.+)$/, ([_, num, color]) => ({ border: `${num}px solid ${color}` })],
  ],
  shortcuts: [
    ['overflow-ellipsis', 'overflow-hidden text-ellipsis whitespace-nowrap'], // 溢出省略号
    ['flex-center', 'flex items-center justify-center'],
    ['common-section', 'p-32px bg-#fff'],
    ['common-page', 'pb-178'], // 抬升页面，底部留白，避免底部被TabBar覆盖
  ],
})
