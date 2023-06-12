import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Test from '@/pages/Test'


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
        },
        {
            path: '/login',
            component:Login,
        },
        {
            path: '/register',
            component:Register,
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