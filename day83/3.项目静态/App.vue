<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Header></Header>
            <Main :todos="todos"></Main>
            <Footer
                :todos="todos"
            ></Footer>
        </div>
    </div>
</template>

<script>
// 写页面的步骤:
// 1. 静态搭建
//    拆分组件(写组件),注意拆分css:
//    定义 - 创建.vue文件
//    注册 - 局部注册,在配置项components中注册 , 全局注册Vue.component()
//    使用 - 在页面中使用组件标签
// 2. 初始化数据展示
//    2.1 准备数据
//    2.2 直接展示
//        将todos数据传递给Main组件,在Main组件中对Item组件进行循环展示
//    2.3 计算展示
//        在Footer组件中需要展示,全选状态、选中个数、全部个数
// 3. 交互
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
export default {
    name: "App",
    components: {
        Header,
        Main,
        Footer
    },
    data() {
        return {
            todos: [
                { id: 10001, content: '抽烟', isSel: false },
                { id: 10002, content: '喝酒', isSel: true },
                { id: 10003, content: '烫头', isSel: false }
            ]
        }
    }
};
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>