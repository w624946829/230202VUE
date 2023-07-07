<template>
  <div class="box">
    <h1>组件间通信10: 插槽==> 作用域插槽</h1>
    <h2>需求: 自定义TODO列表组件能实现下面需求</h2>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <List :todos="todos">
      <template v-slot="{row,$index}">
        <p :style="{color:row.isComplete?'green':''}">id:{{row.id}}--标题:{{row.title}}--索引:{{$index}}</p>
      </template>
    </List>
    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
      <List :todos="todos">
      <template v-slot="{row,$index}">
        <p :style="{color:$index%2==0?'green':'blue'}">序号:{{$index+1}}--标题:{{row.title}}</p>
      </template>
    </List>
  </div>
</template>
<script lang="ts">
export default {
  name: 'SlotTest'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import List from './List.vue'
import type {Users} from './types'
const todos = ref<Users>([
  {id:1,title:'AAA',isComplete:false},
  {id:2,title:'BBB',isComplete:true},
  {id:3,title:'CCC',isComplete:false},
  {id:4,title:'DDD',isComplete:false}
])

</script>
