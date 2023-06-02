<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Header :todos="todos" :addTodo="addTodo"></Header>
            <Main 
            :todos="todos"
            :changeTodoSel="changeTodoSel"
            :deleteTodo="deleteTodo"
            ></Main>
            <Footer
            :todos="todos"
            :changeCheckeAll ="changeCheckeAll"
            :deleteChecked="deleteChecked"
            ></Footer>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default {
    name: "App",
    components: {
        Header,
        Main,
        Footer,
    },
    data() {
        return {
            todos: JSON.parse(localStorage.getItem("TODOS"))||[
                { id: 10001, content: "抽烟", isSel: true },
                { id: 10002, content: "喝酒", isSel: true },
                { id: 10003, content: "烫头", isSel: true },
            ],
        };
    },
    watch:{
        todos:{
            handler(navl){
                localStorage.setItem('TODOS',JSON.stringify(navl))
            },
            deep:true,
        }
    },
    methods: {
        addTodo(todo) {
            this.todos.push(todo);
        },
        //修改todo选中状态（下标传参）
        changeTodoSel(index){
            this.todos[index].isSel = !this.todos[index].isSel
        },

        //删除todo
        deleteTodo(index){
            this.todos.splice(index,1)
        },

        //全选、全不选
        changeCheckeAll(bool){
            this.todos.forEach(item=>item.isSel = bool)
        },
        
        //删除先选中的
        deleteChecked(){
            this.todos = this.todos.filter(item=>!item.isSel)
        }
    },
};
</script>

<style scoped>
/*app*/
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