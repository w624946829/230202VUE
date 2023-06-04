<template>
    <div class="todo-header">
        <input
            v-model="keyword"
            type="text"
            placeholder="请输入你的任务名称，按回车键确认"
            @keyup.enter="addHandler"
        />
    </div>
</template>

<script>
export default {
    name: "Header",
    props: {
        addTodo: {
            type: Function,
            required: true
        },
        todos: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        addHandler() {

            // 非空校验
            let text = this.keyword.trim() // 去除字符串首尾空格
            if (!text) {
                alert('输入的内容不能为空')
                return
            }

            // 重复校验(看一下已存在的数据中是不是已经有输入的内容了,有就不让添加)
            // some是一个只要有一个成员符合函数返回值的条件(为true),就不再继续检测了
            // some返回值是一个布尔值
            let isRepeat = this.todos.some(todo => todo.content == text)
            if (isRepeat) {
                alert('输入的内容已存在')
                this.keyword = "" // 清空input框
                return
            }

            let todo = {
                id: Date.now(),
                content: text, // 放去除字符串首尾空格之后的字符串
                isSel: false
            }

            this.addTodo(todo)

            this.keyword = ""
        }
    }
};
</script>

<style scoped>
.todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
}

.todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(82, 168, 236, 0.6);
}
</style>