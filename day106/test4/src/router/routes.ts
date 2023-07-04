import { RouteRecordRaw } from "vue-router";
import Home from '../pages/Home/Home.vue'
import About from '../pages/About/About.vue'
const routes:RouteRecordRaw[] = [
    {path:'/home',component:Home},
    {path:'/about',component:About},
]
export default routes