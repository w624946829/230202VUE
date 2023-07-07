<template>
  <div class="box">
    <h4>孙组件标题</h4>
   <h3>content11:{{content11}}</h3>
   <h3>content22:{{content22}}</h3>
   <button @click="updateContent1('+++++')">更新父级组件数据</button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'GrandChild'
}
</script>
<script lang="ts" setup>
import {inject} from 'vue'
const content11 = inject<string>('content11')
const content22 = inject<{name:string,age:number}>('content22')
const updateContent1 =inject<(msg:string)=>void>('updateContent1')

</script>