import router from '@/router/router'
import { progressClose, progressStart } from '@/config/nprogress'

router.beforeEach(async (to: any, from: any, next: any) => {
  progressStart()
  console.log('🚀 ~ router.beforeEach ~ from:', from)
  console.log('🚀 ~ router.beforeEach ~ to:', to)

  next()
})

router.afterEach(() => {
  progressClose()
})

export default router
