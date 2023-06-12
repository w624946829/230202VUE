import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Test from '@/pages/Test'
//完善
// function enhance(target,name){

// };


const originPush = VueRouter.prototype.push;

VueRouter.prototype.push= function (location ,onsuccess,onerror){
    if(onsuccess||onerrot){
        return originPush.call(this,location ,onsuccess,onerror)
    }else{
        return originPush.call(this,location).catch(()=>{})
    }
}

const originReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function (location ,onsuccess,onerror){
    if(onsuccess||onerrot){
        return originReplace.call(this,location ,onsuccess,onerror)
    }else{
        return originReplace.call(this,location).catch(()=>{})
    }
}

Vue.use(VueRouter);

 export default new VueRouter({
    mode:'history',
    routes:[
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
            path:'/',
            redirect:'/home'
        }

    ]
})