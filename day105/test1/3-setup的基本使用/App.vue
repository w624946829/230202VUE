<template>
  <h2>Vue3中可以支持Vue2中大多数的特征</h2>
  <h3>{{msg1}}</h3>
  <h3>{{ msg2 }}</h3>
  <button @click="showMsg">测试</button>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  name: 'App',
  data () {
    return {
      msg1: '大蛤蟆',
      // msg3: '小蟋蟀'
    }
  },
  methods:{
    showMsg(){
      console.log(this.msg3)
      this.test1()
      this.test2()
    },
    test2(){
      console.log('test 2 方法');
      
    }
  },
  setup(){
    const msg2 = ref('大蝌蚪')
    const msg3 = ref('小蝌蚪')
    const test1 = ()=>{
      console.log('test 1 方法');
      
    }
    return {
      msg2,
      msg3,
      test1
    }
  }
})

// vue3中支持大多数vue2中的语法
// setup执行的时机是在beforeCreate之前，此时没有this，是undefined，所以，不能使用this
// ref函数用来定义基本类型的响应式数据，返回的是一个ref类型的对象数据
// reactive用来定义复杂类型的响应数据，返回的是一个proxy类型的对象数据----代理数据
// 可以使用ref函数来定义复杂类型的响应式数据，但是内部通过reactive进行了包裹，产生了一个proxy类型的对象数据，
// 如果想要访问这个数据，需要通过xxx.value 的方式得到这个代理对象数据，在进行操作
</script>

<style scoped>

</style>