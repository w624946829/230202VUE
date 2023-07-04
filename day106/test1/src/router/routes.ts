import Home from '@/pages/Home/Home.vue'
import About from '@/pages/About/About.vue'
import { RouteRecordRaw } from 'vue-router'
const router:RouteRecordRaw[] = [
    {
        path:'/home',
        component:Home
    },
    {
        path:'/about',
        component:About
    }
]
export default router