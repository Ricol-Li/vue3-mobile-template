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
})
