<template>
  <div class="box">
    <h1>组件间通信4: v-model</h1>
    <h2>1. 用在原生标签上</h2>
    <!-- 
      原生标签上的本质: 动态value属性 + 原生input监听(将输入的最新值保存到属性上)
    -->
    <input type="text" v-model="msg1" />
    <p>{{msg1}}</p>
    <input type="text" :value="msg2" @input="msg2=($event.target as HTMLInputElement).value" />
    <p>{{msg2}}</p>
    <hr>

    <h2>2. 用在组件标签上</h2>
    <CustomInput title="消息1" v-model="msg3" />
    <p>{{msg3}}</p>
    <hr />
    <CustomInput title="消息2" :modelValue="msg4" @update:modelValue="msg4=$event" />
    <p>{{msg4}}</p>
    <hr />
    <h2>需求: 自定义方式</h2>
    <!-- 
      组件标签上的本质: 动态value属性 + 自定义input监听(将子组件分发数据保存父组件的属性上)
    -->
    <CustomInput2 title="消息3" v-model:otherProps1="msg5" v-model:otherProps2="msg6" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'ModelTest'
}
</script>
<script lang="ts" setup>
import CustomInput from './CustomInput.vue'
import CustomInput2 from './CustomInput2.vue'
import { ref } from 'vue'
const msg1 = ref('abc1')
const msg2 = ref('abc2')
const msg3 = ref('abc3')
const msg4 = ref('abc4')
const msg5 = ref('abc5')
const msg6 = ref('abc6')
</script>
<style scoped>
</style>

