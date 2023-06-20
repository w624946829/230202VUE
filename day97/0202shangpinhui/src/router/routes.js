import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Test from '@/pages/Test'
import Detail from '@/pages/Detail'

export default[
    {
        path: '/home',
        component:Home,
        // meta:{}//路由的元信息（路由规则的自定义数据）
    },
    {
        path: '/login',
        component:Login,
        meta:{isHideFooter:true}
    },
    {
        path: '/register',
        component:Register,
        meta:{isHideFooter:true}
    },
    {
        path: '/search',
        component:Search,
    },
    {
        path:'/test',
        component:Test,
    },
    {
        name:'detail',
        path:'/detail/:id',
        component:Detail,
    },
    {
        path:'/',
        redirect:'/home'
    }

]