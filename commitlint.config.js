export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 不允许为空
    'type-empty': [
      2, // 触发这条规则时 error 提示
      'never', // 满足这条规则时，则根据(level=2)进行 error 提示
    ],
    // type 允许的类型
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
