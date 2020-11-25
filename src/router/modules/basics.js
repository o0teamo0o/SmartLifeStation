/**基础数据菜单 */
import Layout from '@/layout'

const basicsRouter = {
    path: '/basics',
    component: Layout,
    redirect: '', //重定向地址，在面包屑中点击会重定向去的地址
    name: 'Basics', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
        title: '基础数据', // 设置该路由在侧边栏和面包屑中展示的名字
        icon: 'icon_menu_basics' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    },
    children: [{
            path: 'housing-estate',
            name: 'HousingEstate',
            component: () =>
                import ('@/views/basics/housing-estate/index'),
            meta: {
                title: '小区管理',
                icon: 'icon_menu_basics_housing_estate'
            }
        },
        {
            path: 'bike-shed',
            name: 'BikeShed',
            component: () =>
                import ('@/views/basics/bike-shed/index'),
            meta: {
                title: '车棚管理',
                icon: 'icon_menu_basics_bike-shed'
            }
        },
        {
            path: 'device',
            name: 'Device',
            component: () =>
                import ('@/views/basics/device/index'),
            meta: {
                title: '设备管理',
                icon: 'icon_menu_basics_device'
            }
        },
        {
            path: 'expenses',
            name: 'Expenses',
            component: () =>
                import ('@/views/basics/expenses/index'),
            meta: {
                title: '费用配置',
                icon: 'icon_menu_basics_expenses'
            }
        },
        {
            path: 'qr-code',
            name: 'QRCode',
            component: () =>
                import ('@/views/basics/qr-code/index'),
            meta: {
                title: '二维码导出',
                icon: 'icon_menu_basics_qr_code'
            }
        }
    ]
}
export default basicsRouter