import { cloneDeep } from 'lodash-es'

export default function resetStore({ store }: any) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(initialState)
}
