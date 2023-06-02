<template>
    <li @mouseenter="isShow = true" @mouseleave="isShow = false">
        <label>
            <input type="checkbox" :checked="todo.isSel" @change="changeHandler"/>
            <span>{{ todo.content }}</span>
        </label>
        <button v-show="isShow" class="btn btn-danger" @click="deleteTodo(index)">删除</button>
    </li>
</template>

<script>
export default {
    name: "Item",
    props: {
        todo: Object,
      
        index: Number,
        // deleteTodo: Function
    },
    data() {
        return {
            isShow: false // 不展示删除按钮
        }
    },
    methods: {
        changeHandler() {
            // id传参
            // this.changeTodoSel(this.todo.id)
            // 下标传参
            // this.changeTodoSel(this.index)
            this.$emit('itemChecked',this.index)
        },
        deleteTodo(){
            this.$emit('itemDelete',this.index)
        }
    }
};
</script>

<style scoped>
li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
}

li label {
    float: left;
    cursor: pointer;
}

li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
}

li button {
    float: right;
    margin-top: 3px;
}

li:before {
    content: initial;
}

li:last-child {
    border-bottom: none;
}
</style>