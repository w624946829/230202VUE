<template>
    <ul class="todo-main">
        <Item 
        v-for="(item, index) in todos" 
        :key="index" 
        :todo="item"
        :index="index"
        :changeTodoSel="changeTodoSel"
        :deleteTodo ="deleteTodo"
        ></Item>
    </ul>
</template>

<script>
import Item from "@/components/Item";
export default {
    name: "Main",
    components: {
        Item,
    },
    props: {
        todos: {
            type: Array,
            required: true,
        },
        changeTodoSel:{
            type:Function,
            required: true,
        },
        deleteTodo:{
             type:Function,
            required: true,
        }
    },
};
</script>

<style scoped>
/*main*/
.todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
}

.todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}
</style>