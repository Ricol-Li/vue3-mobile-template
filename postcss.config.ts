// 此文件不支持热更新，修改后需要重启生效
// 需要转换的 fixed 选择器列表
const rootContainingBlockSelectorList = [
  '.van-tabbar',
  '.van-popup',
  '.van-popup--bottom',
  '.van-popup--top',
  '.van-popup--left',
  '.van-popup--right',
  // 在这里添加你的选择器
]

export default {
  plugins: {
    'autoprefixer': {},

    // https://github.com/wswmsword/postcss-mobile-forever
    'postcss-mobile-forever': {
      appSelector: '#app',
      appContainingBlock: 'auto',
      necessarySelectorWhenAuto: 'body',
      viewportWidth(file) {
        // 注意，"node_modules/vant"是windows下的路径。
        // 你可以打印下 file查看自己电脑上的vant路径是什么格式
        return file && file.includes('node_modules/vant') ? 375 : 750
      },
      maxDisplayWidth: 600,
      border: true,
      rootContainingBlockSelectorList,
    },
  },
}
