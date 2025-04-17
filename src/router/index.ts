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
