/**
 * * 页面头部搜索栏
 */
import './header-search.less'
import { Search as VanSearch } from 'vant'

export default defineComponent({
  name: 'HeaderSearch',
  props: {
    placeholder: { type: String, default: '搜索' },
  },
  emits: ['search'],
  setup(props, { emit }) {
    const searchValue = ref('')
    function handleSearch(value: string) {
      emit('search', value)
    }

    return () => (
      <div class="search-container">
        <VanSearch v-model={searchValue.value} placeholder={props.placeholder} onSearch={handleSearch} />
      </div>
    )
  },
})
