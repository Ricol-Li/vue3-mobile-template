import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 如果需要修改进度条颜色，可以通过 CSS 覆盖默认样式（例如 #nprogress .bar { background: red !important; }）

// 全局进度条的配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 200, // 递增进度条的速度， 默认200ms
  showSpinner: false, // 是否显示加载动画（右上角旋转图标），默认为 true
  minimum: 0.3, // 进度条的最小百分比，默认为 0.08
  trickle: true, // 是否自动递增进度，默认为 true
  trickleSpeed: 200, // 自动递增的间隔时间（毫秒），默认为 200
  parent: '#app', // 指定进度条的父容器
})

// 打开进度条
export function progressStart() {
  NProgress.start()
}

// 关闭进度条
export function progressClose() {
  NProgress.done()
}
