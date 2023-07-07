// 引入创建上下文的实例的api方法
import { createApp } from 'vue'
// 引入组件
import App from './App.vue'
// 引入store
import store from './store'
// 挂载
createApp(App).use(store).mount('#app')
