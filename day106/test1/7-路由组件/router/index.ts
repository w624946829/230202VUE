import Vue from 'vue'
import VueRouter from 'vue-router'

import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'

import Home from '@/pages/Home/Home.vue'
import About from '@/pages/About/About.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/about',
            component:About
        }
    ]
})

export default router