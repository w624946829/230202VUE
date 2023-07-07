<template>
  <div class="box">
    <!-- 
          子组件需要向父组件传递数据 ==> 作用域插槽
          slot标签的所有属性会自动传递给父组件
         -->
    <ul>
      <li v-for="(todo,index) in todos" :key="todo.id">
        <slot :row="todo" :$index="index" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: 'List'
}
</script>
<script lang="ts" setup>
// 引入Users数组类型
import type { Users } from './types'
// 定义Props接口
interface Props {
  todos: Users
}
// 接收父级组件传递过来的数据
defineProps<Props>()
</script>