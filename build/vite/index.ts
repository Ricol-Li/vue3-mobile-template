import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export function createVitePlugins() {
  return [
    vue(),
    vueJsx(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue', 'tsx'],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      dts: 'src/types/components.d.ts',
      resolvers: [VantResolver()],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      imports: [
        'vue',
        'pinia',
        'vue-router',
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [
        'src/components',
      ],
      resolvers: [VantResolver()],
    }),
    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
  ]
}
