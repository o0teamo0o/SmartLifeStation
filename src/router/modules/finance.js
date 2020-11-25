/**基础数据菜单 */
import Layout from '@/layout'

const financeRouter = {
    path: '/finance',
    component: Layout,
    redirect: '', //重定向地址，在面包屑中点击会重定向去的地址
    name: 'Finance', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
        title: '财务管理', // 设置该路由在侧边栏和面包屑中展示的名字
        icon: 'icon_menu_finance' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    },
    children: [{
            path: 'today',
            name: 'Today',
            component: () =>
                import ('@/views/finance/today/index'),
            meta: {
                title: '今日收入统计',
                icon: 'icon_menu_finance_today'
            }
        },
        {
            path: 'month',
            name: 'Month',
            component: () =>
                import ('@/views/finance/month/index'),
            meta: {
                title: '月收入统计',
                icon: 'icon_menu_finance_month'
            }
        },
        {
            path: 'housing-estate',
            name: 'HousingEstate',
            component: () =>
                import ('@/views/finance/housing-estate/index'),
            meta: {
                title: '小区统计',
                icon: 'icon_menu_finance_housing_estate'
            }
        },
        {
            path: 'bike-shed',
            name: 'BikeShed',
            component: () =>
                import ('@/views/finance/bike-shed/index'),
            meta: {
                title: '车棚统计',
                icon: 'icon_menu_finance_bike_shed'
            }
        }
    ]
}
export default financeRouter