<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Header
                :todos="todos"
                @qwer="addTodo"
            ></Header>
            <Main
                :todos="todos"
                @xxx="changeTodoSel"
                @yyy="deleteTodo"
            ></Main>
            <Footer
                :todos="todos"
                @mmm="changeCheckeAll"
                @nnn="deleteChecked"
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
//    3.1 Header 交互
//        在header的input框中输入内容,点击回车,将输入的内容添加到 todos数组列表中(数组添加一条数据)
//        3.1.1 header的input v-model 收集输入的内容
//        3.1.2 header的input 绑定回车事件,拿到输入的内容
//        3.1.3 给父组件的 todos 添加一条数据
//         注意: 添加的时候应该做一个非空校验 和 重复校验
//    3.2 Main组件中的 每个Item组件都可以选中和取消选中
//         注意: 这里是 Item 组件要修改 App 组件中的数据
//               (也就是孙子要改爷爷中的数据)
//               我们目前只能使用 子组件修改父组件数据(父给自传一个函数)
//               将函数由App组件先传给Main组件,再由Main组件传给Item组件
//         这里我们使用下标来确认修改的是哪一个todo,下标从Main组件循环得到的,把循环的下标传给Item组件,Item组件就有下标了
//    3.3 Main组件中的 每个Item组件都可以删除
//         先让删除按钮能看到(行内的display:none删除和style标签中的display:none删除)
//         需求:鼠标移入item,删除按钮展示,移出不展示
//              控制按钮的显示隐藏使用一个布尔值,当鼠标移入的时候为true,移出的时候为false
//              使用v-if和v-shwo都可以
//         需求: 点击删除按钮,修改App组件中todos的数据(删除一条数据)
//    3.4 Footer组件中,全选框点击  全选/全不选
//        点击全先复选框,修改App组件中所有的todo都变成true/false
//        把修改todos中所有isSel的函数传给 Footer组件,让Footer调用
//    3.5 Footer组件中, 点击"删除已完成"按钮,删除勾选的数据
//        点击"删除已完成",修改App组件中的数据,把App中的todos里面的所有isSel是true的对象删除
// 4. 数据持久化
//    需求:当我们修改了App中的todos数据之后,刷新页面,数据不能丢失
//    1. 当数据发生变化的时候,存储到localStroage中
//       注意:
//          localStroage 中只能存 字符串,想要存数据需要使用 JSON.stringify(nval) 转成JSON字符串
//       localStroage 和 sessionStorage
//       相同点:
//              只能存字符串
//              只能存5M大小
//       不同点:
//             关闭页面 localStroage 不会消失, sessionStorage 会消失
//    2. 当刷新页面的时候,从loaclStorage中拿数据
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