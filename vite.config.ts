import path from 'node:path'
import process from 'node:process'

import { defineConfig, loadEnv } from 'vite'

import { createVitePlugins } from './build/vite'
import { exclude, include } from './build/vite/optimize'

import type { ConfigEnv, UserConfig } from 'vite'

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
    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    },

    optimizeDeps: { include, exclude },
  }
})
