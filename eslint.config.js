import process from 'node:process'

import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,

    // enable UnoCSS support
    // https://unocss.dev/integrations/vscode
    unocss: true,

    formatters: {
      css: true,
    },

  },
  {
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          'groups': [
            'builtin', // Node.js 内置模块（如 fs, path）
            'external', // 外部模块（如 vue, lodash）
            'internal', // 绝对路径（如 @/api）
            ['parent', 'sibling'], // 父级和同级相对路径
            'index', // 当前目录的 index 文件
            'object', // 对象导入（如 import * as xxx）
            'type', // 类型导入
          ],
          'pathGroups': [
            {
              pattern: '@/api/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/store/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/hooks/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '**/*.css',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '**/*.scss',
              group: 'external',
              position: 'after',
            },
          ],
        },
      ],
      'ts/no-use-before-define': 'off',
      'jsdoc/no-multi-asterisks': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-named-exports': 'off',
      'vue/html-self-closing': ['warn', { // 没有子元素，自动使用闭合单标签
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      // 强制 Vue 模板中的组件标签使用 PascalCase
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false, // 仅检查注册的组件
        ignores: [], // 可忽略的组件名
      }],
    },
  },
  {
    ignores: [
      '.github/**',
      'scripts/**',
      'src/components/common-**',
    ],
  },
  {
    languageOptions: {
      globals: {
        wx: 'readonly', // 微信小程序全局对象
      },
    },
  },
)
