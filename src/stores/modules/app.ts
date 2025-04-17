const useAppStore = defineStore(
  'app',
  () => {
    const appState = reactive({})

    return {
      appState,
    }
  },
  {
    persist: true,
  },
)
export default useAppStore
