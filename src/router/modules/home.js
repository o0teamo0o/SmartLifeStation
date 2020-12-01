/**基础数据菜单 */
import Layout from '@/layout'

const basicsRouter = {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
        path: 'home',
        name: 'Home',
        component: () =>
            import ('@/views/home/index'),
        meta: { title: '工作台', icon: 'home' }
    }]
}
export default basicsRouter