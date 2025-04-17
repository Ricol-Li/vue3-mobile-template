import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import viewport from 'postcss-mobile-forever'
import { createVitePlugins } from './build/vite'
import { exclude, include } from './build/vite/optimize'

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: createVitePlugins(),
    server: {
      open: false,
      cors: true,
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          // target: 'http://fkdj.yqxy.cn', // 正式环境
          target: 'http://fkdj.yqxy.cn:3001/', // 测试环境
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },

      },
    },
    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
        '~root': path.join(__dirname, '.'),
      },
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          // https://github.com/wswmsword/postcss-mobile-forever
          viewport({
            appSelector: '#app', // 需要在样式中定义，而且和样式中的选择器是全等匹配，意思就是需要在样式文件中声明下#app {}
            viewportWidth(file) {
              // 注意，"node_modules/vant"是windows下的路径。
              // 你可以打印下 file查看自己电脑上的vant路径是什么格式
              return file && file.includes('node_modules/vant') ? 375 : 750
            },
            unitPrecision: 3,
            maxDisplayWidth: 600,
            rootContainingBlockSelectorList: [
              'van-tabbar',
              'van-popup',
            ],
            border: true,
          }),
        ],
      },
    },
    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    },

    optimizeDeps: { include, exclude },
  }
})
