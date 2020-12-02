/**基础数据菜单 */
import Layout from '@/layout'


const usersRouter = {
    path: '/users',
    component: Layout,
    redirect: '/users/lists', //重定向地址，在面包屑中点击会重定向去的地址
    name: 'Users', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
        title: '用户管理', // 设置该路由在侧边栏和面包屑中展示的名字
        icon: 'icon_menu_users' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    },
    children: [{
            path: 'lists',
            name: 'Lists',
            component: () =>
                import ('@/views/users/lists/index'),
            meta: {
                title: '用户列表',
                icon: 'icon_menu_users_lists'
            }
        },
        {
            path: 'operation',
            name: 'Operation',
            component: () =>
                import ('@/views/users/operation/index'),
            meta: {
                title: '开闸记录',
                icon: 'icon_menu_users_operation'
            }
        },
        {
            path: 'pay',
            name: 'Pay',
            component: () =>
                import ('@/views/users/pay/index'),
            meta: {
                title: '缴费记录',
                icon: 'icon_menu_users_pay'
            }
        },
        {
            path: 'deed',
            name: 'Deed',
            component: () =>
                import ('@/views/users/deed/index'),
            meta: {
                title: '行为记录',
                icon: 'icon_menu_users_deed'
            }
        },
        {
            path: 'unusual',
            name: 'Unusual',
            component: () =>
                import ('@/views/users/unusual/index'),
            meta: {
                title: '异常记录',
                icon: 'icon_menu_users_unusual'
            }
        }
    ]
}
export default usersRouter