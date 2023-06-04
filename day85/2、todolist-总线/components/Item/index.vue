<template>
    <li @mouseenter="isShow = true" @mouseleave="isShow = false">
        <label>
            <input type="checkbox" :checked="todo.isSel" @change="changeHandler"/>
            <span>{{ todo.content }}</span>
        </label>
        <button v-show="isShow" class="btn btn-danger" @click="deleteTodo">删除</button>
    </li>
</template>

<script>
export default {
    name: "Item",
    props: {
        todo: Object,
        index: Number,

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
            // 3、发送数据的组件找到总线，触发事件，传递参数
            this.$bus.$emit('ChangeChecked',this.index)
        },
        deleteTodo(){
            this.$bus.$emit('deleteTodo',this.index)
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