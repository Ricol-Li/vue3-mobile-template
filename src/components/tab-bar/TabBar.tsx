import { defineComponent } from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { routeWhiteList, tabBarPrimaryRouteList, tabBarSecondaryRouteList } from '@/config/route'

export default defineComponent({
  name: 'TabBar',
  setup() {
    const route = useRoute()

    const show = computed(() => routeWhiteList.includes(route.name as string))
    const tabBarList = computed(() => {
      return route.meta.type === 'primary' ? tabBarPrimaryRouteList : tabBarSecondaryRouteList
    })

    return () => (
      <>
        {
          show.value && (
            <Tabbar placeholder={true} route={true}>
              {
                tabBarList.value.map(item => (
                  <TabbarItem to={item.path} name={item.name}>
                    {{
                      default: () => item.meta.title,
                      icon: () => <img src={route.name === item.name ? item.selectedIconPath : item.iconPath} />,
                    }}
                  </TabbarItem>
                ))
              }
            </Tabbar>
          )
        }
      </>
    )
  },
})
