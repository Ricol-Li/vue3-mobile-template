/**
 * * 使用函数的方式打开popup弹窗
 */
import type { VNode } from 'vue'
import { createVNode, render } from 'vue'

interface IPopupOptions {
  component: any
  props?: {
    [key: string]: any
  }

}
export function openPopup<T>(options: IPopupOptions) {
  return new Promise<T>((resolve, reject) => {
    // 创建一个容器 div
    const container = document.createElement('div')
    document.body.appendChild(container)
    // 创建 VNode
    const vnode: VNode = createVNode(options.component, {
      ...options.props,
      onResolve: (value: T) => {
        resolve(value)
        cleanup() // 确定后清理
      },
      onReject: (reason?: any) => {
        reject(reason)
        cleanup() // 取消或关闭后清理
      },
      onClosed: () => {
        cleanup()
      },
    })

    // 渲染到容器
    render(vnode, container)

    // 清理函数
    const cleanup = () => {
      render(null, container) // 卸载组件
      document.body.removeChild(container) // 移除 DOM
    }
  })
}
