// 引入创建上下文的实例的api方法
import { createApp } from 'vue'
// 引入组件
import App from './App.vue'
// 引入路由器
import router from './router'
// 挂载
createApp(App).use(router).mount('#app')
