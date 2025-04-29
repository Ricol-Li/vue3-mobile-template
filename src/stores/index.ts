import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import resetStore from './reset-store'

import useAppStore from './modules/app'
import useActivityStore from './modules/activity'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(resetStore)

export { useAppStore, useActivityStore }
export default pinia
