<template>
  <h2>Vue3中可以支持vue2中大多数的特征</h2>
  <h3>{{ msg }}</h3>
  <h3>{{ showMsg() }}</h3>
  <h3>{{ count }}</h3>
  <button @click="updateCount">更新数据</button>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";

// 用来定义组件的，需要传入一个配置对象---- 暴露出去的就是一个组件对象
export default defineComponent({
  name: "App",
  // Vue2中的第一个生命周期钩子
  beforeCreate() {
    console.log("第一个生命周期钩子，beforeCreate");
  },
  // vue2中定义状态数据，响应式数据
  data() {
    return {
      msg: "这是一个美好的时代",
    };
  },
  // vue2中定义方法的写法
  methods: {
    showMsg() {
      console.log("msg的内容是", this.msg);
    },
  },
  // vue3中组合api的入口
  setup() {
    // console.log('这是一个组合API，setup');
    // 定义一个变量存储一个数据，不是响应式的数据
    let count = ref(0);
    // 定义一个方法
    const updateCount = () => {
      // 需要使用.value属性来修改数据的值
      count.value++;
      console.dir(count);
    };
    // setup方法中需要使用return进行对象的返回，连的数据可以直接在模板中使用
    return {
      count,
      updateCount,
    };
  },
});
</script>

<style scoped>
</style>