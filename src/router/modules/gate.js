/**基础数据菜单 */
import Layout from '@/layout'


const gateRouter = {
    path: '/gate',
    component: Layout,
    redirect: '', //重定向地址，在面包屑中点击会重定向去的地址
    name: 'Gate', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
        title: '闸机管理', // 设置该路由在侧边栏和面包屑中展示的名字
        icon: 'documentation' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    },
    children: [{
            path: 'examine',
            name: 'Examine',
            component: () =>
                import ('@/views/gate/examine/index'),
            meta: { title: '次数审核' }
        },
        {
            path: 'operation',
            name: 'Operation',
            component: () =>
                import ('@/views/gate/operation/index'),
            meta: { title: '手动开闸' }
        }
    ]
}
export default gateRouter