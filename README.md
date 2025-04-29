# 从0到1搭建Vue3移动端项目
项目使用到的技术，vue3，vite@6，TypeScript，eslint@9，@antfu/eslint-config，unocss，less，postcss-mobile-forever，vant@4，vue-router，pinia，pinia-plugin-persistedstate，<font style="color:rgb(37, 41, 51);">@vitejs/plugin-vue-jsx，@iconify/vue，lint-staged，simple-git-hooks，commit-lint。因为篇幅有限，本篇章是默认对这些所用到的技术有所了解的。</font>

### 第一步：初始化vue项目
```bash
pnpm create vite <my-project-name> --template vue-ts

// 你也可以使用 . 作为项目名称，在当前目录中创建项目脚手架。
```

修改index.html代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- 替换项目ICON -->
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <!-- 增加viewport配置 -->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, viewport-fit=cover"
    />
    <!-- 修改项目名称 -->
    <title>项目名</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>

```

### 第二步：引入@antfu/eslint-config
```bash
pnpm i -D eslint @antfu/eslint-config 
```

[@antfu/eslint-config](https://github.com/antfu/eslint-config) 根据文档进行配置



<font style="color:rgb(31, 35, 40);">如果还需要格式化其他文件，需要安装eslint-plugin-format，使用外部格式化工具格式化 ESLint 尚未处理的文件（ </font>`<font style="color:rgb(31, 35, 40);">.css</font>`<font style="color:rgb(31, 35, 40);"> ， </font>`<font style="color:rgb(31, 35, 40);">.html</font>`<font style="color:rgb(31, 35, 40);"> ，等等）。</font>

```bash
pnpm i -D eslint-plugin-format
```

```javascript
// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true,
    /**
     * Format Markdown files
     * Supports Prettier and dprint
     * By default uses Prettier
     */
    markdown: 'prettier'
  }
})
```

### 第三步：使用Unocss （可选）
[安装并配置UnoCss](https://unocss.net/integrations/vite)

安装unocss

```bash
pnpm add -D unocss
```

Vite中使用unocss插件

```javascript
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UnoCSS()]
})
```

创建uno.config.ts

```javascript
import { defineConfig, presetAttributify, presetMini } from 'unocss'

// 可以根据自己的需要再添加presets，shortcuts，rules，transformers等
export default defineConfig({
  presets: [
    presetMini(),
    presetAttributify({
      /* preset options */
    }),
  ],
})
```

<font style="color:rgb(60, 60, 67);">将 </font>`virtual:uno.css`<font style="color:rgb(60, 60, 67);"> 添加到您的主入口文件：</font>

```javascript
import 'virtual:uno.css'
```

此外，你还需要安装另外一个依赖，并加入到eslint.config.js配置中

```bash
pnpm i -D @unocss/eslint-plugin
```

```javascript
// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
})
```

### 第四步：适配移动端
[postcss-mobile-forever](https://github.com/wswmsword/postcss-mobile-forever)，<font style="color:rgb(31, 35, 40);">是一款 PostCSS 插件，用于将固定尺寸转为伸缩尺寸，得到一个能够等比例缩放的视图，并提供一揽子限制最大宽度的办法。</font>

[@unocss/preset-rem-to-px](https://unocss.net/presets/rem-to-px)

##### 安装
```bash
pnpm install -D postcss postcss-mobile-forever autoprefixer @unocss/preset-rem-to-px less
// autoprefixer 是一款postcss插件，会自动添加浏览器前缀
// @unocss/preset-rem-to-px 将所有工具类中的 rem 转换为 px
// less css预处理器，相对简单轻量，也可以选择sass

// 浏览器样式重置
pnpm add @unocss/reset

// main.ts
import '@unocss/reset/normalize.css'
```

##### 配置postcss.config.ts
```javascript
// postcss.config.ts
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

```

##### 配置uno.config.ts
```javascript
// uno.config.ts
export default defineConfig({
  presets: [
    // ...
    // 为什么要用到这个插件？
    // 模板使用 viewport 作为移动端适配方案，unocss 默认单位为 rem
    // 所以需要转成 px，然后由 postcss 把 px 转成 vw/vh，完成适配
    presetRemToPx({
      // 这里为什么要设置基础字体大小？看下面这篇文章
      // https://juejin.cn/post/7262975395620618298
      baseFontSize: 4,
    }),
})
```

##### 适配桌面端
<font style="color:rgb(52, 73, 94);">Vant 是一个面向移动端的组件库，因此默认只适配了移动端设备，这意味着组件只监听了移动端的 </font>`<font style="color:rgb(88, 114, 126);background-color:rgb(247, 248, 250);">touch</font>`<font style="color:rgb(52, 73, 94);"> 事件，没有监听桌面端的 </font>`<font style="color:rgb(88, 114, 126);background-color:rgb(247, 248, 250);">mouse</font>`<font style="color:rgb(52, 73, 94);"> 事件。如果你需要在桌面端使用 Vant，可以引入我们提供的 </font>[<font style="color:rgb(25, 137, 250);">@vant/touch-emulator</font>](https://github.com/vant-ui/vant/tree/main/packages/vant-touch-emulator)<font style="color:rgb(52, 73, 94);">，这个库会在桌面端自动将 </font>`<font style="color:rgb(88, 114, 126);background-color:rgb(247, 248, 250);">mouse</font>`<font style="color:rgb(52, 73, 94);"> 事件转换成对应的 </font>`<font style="color:rgb(88, 114, 126);background-color:rgb(247, 248, 250);">touch</font>`<font style="color:rgb(52, 73, 94);"> 事件，使得组件能够在桌面端使用。</font>

```bash
# 安装
pnpm i @vant/touch-emulator -S
```

```typescript
// main.ts
import '@vant/touch-emulator'; // 引入模块后自动生效
```

### 第五步：安装Vant并配置按需引入
1. 安装

```bash
// 安装vant
pnpm i vant

// 安装自动导入和按需引入插件
pnpm i @vant/auto-import-resolver unplugin-vue-components unplugin-auto-import -D
```

2. 配置

```javascript
// vite.config.ts
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default {
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};

// main.ts
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

```

### 第六步：安装并配置vue-router，pinia，pinia-plugin-persistedstate
##### 安装
```bash
pnpm add vue-router pinia pinia-plugin-persistedstate nprogress

// 安装nprogress type
pnpm install -D @types/nprogress
```

##### 配置store
```javascript
// 第一步 新建一个目录stores，再在stores下新建一个modules目录
// 第二步，在stores目录新建一个index.ts和reset-store.ts,在modules目录新建app.ts

// stores/modules/app.ts
const useAppStore = defineStore(
  'app',
  () => {
    const appState = reactive({})

    return {
      appState,
    }
  },
  {
    // 持久化存储的配置指南：https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
    persist: true, // 您的整个 store 现在将使用 默认的持久性设置进行保存
  },
)
export default useAppStore


// reset-store.ts
import { cloneDeep } from 'lodash-es' // 如果没安装需要先安装 pnpm add lodash-es
// 因为$reset() 在setup语法中，不可用，因为他只支持选项式API 所以需要写一个pinia插件
export default function resetStore({ store }: any) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(initialState)
}

// main.ts 注册 stores
import { createApp } from 'vue'
import App from './App.vue'
import store from '@/stores'


const app = createApp(App)

app.use(store)
app.mount('#app')

```

##### 创建路由基础页面
```vue
<!-- 
第一步：在src目录下，新建views目录，
第二步：在views目录下新建home目录
第三步：在home目录下新建index.vue
也可以使用linux命令在项目根目录一行命令搞定  
mkdir -p src/views/home && touch src/views/home/index.vue

-->
  
<!-- src/views/home/index.vue -->
<script setup lang="ts"></script>

<template>
  <div>
    我是首页
  </div>
</template>

<style scoped lang="less"></style>

<!-- 同理，再在src目录下新建一个个人中心目录以及页面 -->
<!-- mkdir -p src/views/profile && touch src/views/profile/index.vue -->
<!-- src/views/profile/index.vue -->
<script setup lang="ts"></script>

<template>
  <div>
    我是个人中心页
  </div>
</template>

<style scoped lang="less"></style>


```

##### 配置路由
```typescript
// 创建路由基础配置文件 mkdir -p src/router && touch src/router/router.ts
// 创建路由守卫文件 touch src/router/index.ts

// src/router/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue'),
  },
]

export const routes = [...constantRoutes]

export default createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

// .env 文件配置环境变量
VITE_APP_PUBLIC_PATH = '/vue'

// src/router/index.ts
import router from '@/router/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(async (to: any, from: any, next: any) => {
  NProgress.start()
  console.log('🚀 ~ router.beforeEach ~ from:', from)
  console.log('🚀 ~ router.beforeEach ~ to:', to)

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router

// main.ts 注册路由
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

app.use(router)
app.mount('#app')

// 修改根组件App.vue，让页面有路由切换
<script setup lang="ts" name="App">
import { useAppStore } from './stores'

const appStore = useAppStore()

console.log(appStore)
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <section class="app-wrapper">
      <KeepAlive :include="['home']">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.name" />
        </Transition>
      </KeepAlive>
    </section>
  </RouterView>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  position: relative;
}

/* 定义淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


```

### 第七步：引入Icon
```bash
pnpm install --save-dev @iconify/vue  // https://www.npmjs.com/package/@iconify/vue
```

[https://icones.js.org/](https://icones.js.org/) 去这个网站查找你需要的Icon，复制出icon的名称即可

使用：

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div>
    <Icon icon="fluent-emoji:accordion" />
  </div>
</template>

<style scoped lang="less">

</style>
```

### 第八步：引入插件，让vue支持jsx/tsx
在vue中，每个组件都要写单文件vue组件，有点繁琐和不灵活，加入<font style="color:rgb(255, 80, 44);background-color:rgb(255, 245, 245);">@vitejs/plugin-vue-jsx插件，</font><font style="color:rgb(37, 41, 51);">让我们在项目中使用 JSX/TSX</font>

##### <font style="color:rgb(37, 41, 51);">安装@vitejs/plugin-vue-jsx</font>
```bash
pnpm insatll @vitejs/plugin-vue-jsx --save
# 或
pnpm add @vitejs/plugin-vue-jsx
```

##### 配置
```typescript
// vite.config.ts
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
});

// tsconfig.json
{
  "compilerOptions": {
    // ...
    "jsx": "preserve",
    "jsxImportSource": "vue"
    // ...
  }
}

```

##### 使用
官网教程

[渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html)

参考了这两篇文章

[如何在 vue3 中使用 jsx/tsx?](https://juejin.cn/post/7213356423810924581)

[【开源自荐】🎉Vue TSX Admin, 中后台管理系统开发的新方向](https://github.com/ruanyf/weekly/issues/3833)

### 第九步：lint-staged & simple-git-hooks（参考@antfu/eslint-config）
<font style="color:rgb(31, 35, 40);">如果您想在每次提交前应用代码检查和自动修复，可以将以下内容添加到您的 </font>`<font style="color:rgb(31, 35, 40);">package.json</font>`<font style="color:rgb(31, 35, 40);"> 中：</font>

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
pnpm i -D lint-staged simple-git-hooks

// to active the hooks
npx simple-git-hooks
```

### 第十步：配置CommitLint
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Commitlint 是一个用于 </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">检查 Git 提交信息（commit message）是否符合规范</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);"> 的工具，旨在帮助团队统一提交格式、提升代码可维护性和协作效率。</font>

##### <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">安装依赖</font>
```bash
pnpm install --save-dev @commitlint/cli @commitlint/config-conventional
```

+ @commitlint/cli：核心命令行工具，用于检查提交消息。
+ @commitlint/config-conventional：提供 Conventional Commits 规范的预设规则。

##### 配置commitlint
1. 创建 commitlint 配置文件

在项目根目录创建 commitlint.config.js：

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 不允许为空
    'type-empty': [
      2, // 触发这条规则时 error 提示
      'never', // 满足这条规则时，则根据(level=2)进行 error 提示
    ],
    'type-enum': [
      2, // 触发这条规则时 error 提示
      'always', // 违背这条规则时，则根据 (level) 进行提示
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档更改
        'style', // 代码格式（不影响功能）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 添加测试
        'build', // 构建系统或外部依赖更改
        'ci', // CI 配置更改
        'chore', // 其他不修改 src 或 test 的更改
        'revert', // 回滚提交
      ],
    ],
    // body 至少包含4个字符
    'body-min-length': [2, 'always', 4],
  },
}
```

+ extends: ['@commitlint/config-conventional']：使用 Conventional Commits 规范。
+ rules：自定义规则，指定允许的提交类型（如 feat, fix）。

##### 更新package.json配置
```json
"simple-git-hooks": {
  "commit-msg": "npx --no-install commitlint --edit $1", // 新增
  "pre-commit": "pnpm lint-staged"
},
```

<font style="color:#DF2A3F;">记住：新增了simple-git-hooks配置，一定要再次执行npx simple-git-hooks，以激活钩子 </font>

文章参考：[Git提交规范的工具——commitlint](https://juejin.cn/post/7158473063846117383)



