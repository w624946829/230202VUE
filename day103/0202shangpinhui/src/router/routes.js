// 正常引入
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Test from '@/pages/Test'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'

// 懒加载引入
const Home =()=>import ('@/pages/Home')
const Login=()=>import ('@/pages/Login')
const Register=()=>import ('@/pages/Register')
const Search=()=>import ('@/pages/Search')
const Test=()=>import ('@/pages/Test')
const Detail=()=>import ('@/pages/Detail')
const AddCartSuccess=()=>import ('@/pages/AddCartSuccess')
const ShopCart=()=>import ('@/pages/ShopCart')
const Trade=()=>import ('@/pages/Trade')
const Pay=()=>import ('@/pages/Pay')
const PaySuccess=()=>import ('@/pages/PaySuccess')
const Order=()=>import ('@/pages/Order')

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
        beforeEnter(to,from,next){
            if(from.path.slice(0,7)==='/detail'){
                next()
            }else{
                next('/home')
            }
        }
    },
    {
       
        path:'/shopcart',
        component:ShopCart,
    },
    {
       
        path:'/trade',
        component:Trade,
        beforeEnter(to,from,next){
            if(from.path==='/shopcart'){
                next()
            }else{
                next('/home')
            }
        }
    },
    {
        path:'/pay',
        component:Pay,
        beforeEnter(to,from,next){
            if(from.path==='/trade'){
                next()
            }else{
                next('/home')
            }
        }
      },
      
      {
        path:'/paysuccess',
        component:PaySuccess,
      },
      {
        path:'/order',
        component:Order,
      },
    {
        path:'/',
        redirect:'/home'
    }

]