import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Test from '@/pages/Test'

function enhance(target, name) {
    // 第一步：保存原始的push
    const origin = target.prototype[name];
    // 第二步：去修改
    target.prototype[name] = function (location, onsuccess, onerror) {
        if (onsuccess || onerror) {
            return origin.call(this, location, onsuccess, onerror)
        } else {
            return v.call(this, location).catch(() => { })
        }
    }
}
enhance(VueRouter,'push')
enhance(VueRouter,'replace')


Vue.use(VueRouter);



export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/search',
            component: Search,
        },
        {
            path: '/test',
            component: Test,
        },
        {
            path: '/',
            redirect: '/home'
        }

    ]
})