<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Header
                :todos="todos"
                :addTodo="addTodo"
            ></Header>
            <Main
                :todos="todos"
              
            ></Main>
            <Footer
                :todos="todos"
                :changeCheckeAll="changeCheckeAll"
                :deleteChecked="deleteChecked"
            ></Footer>
        </div>
    </div>
</template>

<script>

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
    mouted(){
        //2、接收数据的组件，找到总线，绑定事件，留下回调，接收参数
        this.$bus.$on('ChangeChecked',this.changeTodoSel)
        this.$bus.$on('deleteTodo',this.deleteTodo)
    },
    data() {
        return {
            todos: JSON.parse(localStorage.getItem('TODOS')) || [
                { id: 10001, content: '抽烟', isSel: false },
                { id: 10002, content: '喝酒', isSel: true },
                { id: 10003, content: '烫头', isSel: false }
            ]
        }
    },
    watch: {
        todos: {
            handler(nval) {
                localStorage.setItem('TODOS', JSON.stringify(nval))
            },
            deep: true // 这里需要深度监听
        }
    },
    methods: {
        // 添加todo
        addTodo(todo) {
            this.todos.push(todo)
        },
        // 修改todo选中状态(id传参)
        // changeTodoSel(id) {
        //     console.log('修改tode选中状态', id)
        //     let targetTodo = this.todos.find(item => item.id == id)
        //     targetTodo.isSel = !targetTodo.isSel
        // }
        // 修改todo选中状态(下标传参)
        changeTodoSel(index) {
            this.todos[index].isSel = !this.todos[index].isSel
        },
        // 删除todo
        deleteTodo(index) {
            this.todos.splice(index, 1)
        },
        // 全选/全不选
        changeCheckeAll(bool) {
            this.todos.forEach(item => item.isSel = bool)
        },
        // 删除选中的
        deleteChecked() {
            this.todos = this.todos.filter(item => !item.isSel)
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