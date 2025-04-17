import { createApp } from 'vue'
import App from './App.vue'
import store from '@/stores'
import router from '@/router'
import 'virtual:uno.css'
import '@/styles/app.less'
import '@/styles/var.less'
// import 'normalize.css'

import 'vant/lib/index.css'
/* --------------------------------
Vant 中有个别组件是以函数的形式提供的，
包括 Toast，Dialog，Notify 和 ImagePreview 组件。
在使用函数组件时，unplugin-vue-components
无法自动引入对应的样式，因此需要手动引入样式。
------------------------------------- */
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
