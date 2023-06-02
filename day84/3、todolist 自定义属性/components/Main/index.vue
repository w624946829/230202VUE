<template>
    <ul class="todo-main">
        <Item
            v-for="(item, index) in todos"
            :key="index"
            :todo="item"
            :index="index"
            @itemChecked="changechecked"
            @itemDelete="deleteTodo"
        ></Item>
        <!-- @changeTodoSel="$emit('changeTodoSel',index)" -->
    </ul>
</template>

<script>
import Item from '../Item/index.vue'
export default {
    name: "Main",
    components: {
        Item
    },
    props: ["todos"],
    methods:{
        changechecked(idx){
            this.$emit('xxx',idx) 
        },
        deleteTodo(idx){
            this.$emit('yyy',idx) 
        }
    }

}
</script>

<style scoped>
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