<template>
    <div class="todo-footer">
        <label>
            <!-- <input type="checkbox" :checked="isSelAll"/> -->
            <input type="checkbox" v-model="isSelAll"/>
        </label>
        <span> <span>已完成{{ selCount }}</span> / 全部{{ todos.length }} </span>
        <button class="btn btn-danger" @click="deleteChecked">清除已完成任务</button>
    </div>
</template>

<script>
export default {
    name: "Footer",
    props: {
        todos: {
            type: Array,
            required: true
        },
        changeCheckeAll: {
            type: Function,
            required: true
        },
        deleteChecked: {
            type: Function,
            required: true
        }
    },
    computed: {
        // 计算选中个数
        selCount() {
            // reduce方法用于累加
            // 两个参数
            //  参数一: 累加的回调
            //          在这个回调中也有两个参数 prev 和 item
            //          prev 是上一次累加的结果
            //          item 是当前的项
            //          回调函数return的值,将作为下一次循环的prev
            //  参数二: 初始值
            // 返回值: 累加的结果
            let res = this.todos.reduce((prev, item) => {
                return prev + item.isSel
            }, 0)
            return res
        },
        // 是否全选
        isSelAll: {
            get() {
                // return this.todos.every(item => item.isSel)
                let res = this.todos.every(item => {
                    return item.isSel
                })
                return res && this.todos.length != 0
            },
            set(val) {
                this.changeCheckeAll(val)
            }
        }
    }
};
</script>

<style scoped>
.todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
}

.todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}

.todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
}

.todo-footer button {
    float: right;
    margin-top: 5px;
}
</style>