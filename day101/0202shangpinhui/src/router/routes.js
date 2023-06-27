/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-20 08:28:41
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-21 10:49:15
 * @FilePath: \day97\0202shangpinhui\src\router\routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Test from '@/pages/Test'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'

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
       
        path:'/addcart_success',
        component:AddCartSuccess,
    },
    {
       
        path:'/shopcart',
        component:ShopCart,
    },
    {
       
        path:'/trade',
        component:Trade,
    },
    {
        path:'/pay',
        component:Pay,
      },
    {
        path:'/',
        redirect:'/home'
    }

]