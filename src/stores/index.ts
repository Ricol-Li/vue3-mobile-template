import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import resetStore from './reset-store'

import useAppStore from './modules/app'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(resetStore)

export { useAppStore }
export default pinia
