/**基础数据菜单 */
import Layout from '@/layout'

const systemsRouter = {
    path: '/systems',
    component: Layout,
    redirect: '', //重定向地址，在面包屑中点击会重定向去的地址
    name: 'Systems', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
        title: '系统管理', // 设置该路由在侧边栏和面包屑中展示的名字
        icon: 'icon_menu_systems' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    },
    children: [{
            path: 'resources',
            name: 'Resources',
            component: () =>
                import ('@/views/systems/resources/index'),
            meta: {
                title: '资源管理',
                icon: 'icon_menu_systems_resources'
            }
        },
        {
            path: 'log-on',
            name: 'LogOn',
            component: () =>
                import ('@/views/systems/log-on/index'),
            meta: {
                title: '登录管理',
                icon: 'icon_menu_systems_log_on'
            }
        },
        {
            path: 'role',
            name: 'Role',
            component: () =>
                import ('@/views/systems/role/index'),
            meta: {
                title: '角色管理',
                icon: 'icon_menu_systems_role'
            }
        }
    ]
}
export default systemsRouter