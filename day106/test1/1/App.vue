<template>
  <h2>计算属性和监视的例子</h2>
  <fieldset>
    <legend>姓氏和名字</legend>
    姓氏：<input type="text" v-model="user.firstName" /> <br />
    名字：<input type="text" v-model="user.lastName" /> <br />
  </fieldset>

  <fieldset>
    姓名：<input type="text" v-model="fullName1" /> <br>
    姓名：<input type="text" v-model="fullName2"/> <br>
    姓名：<input type="text" v-model="fullName3"/> <br>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, watch ,watchEffect} from "vue";

export default defineComponent({
  setup() {
    // 基本的姓氏和名字
    const user = reactive({
      firstName: "张",
      lastName: "三",
    });

    // 姓名1--使用到了get
    const fullName1 = computed(() => {
      return `${user.firstName}_${user.lastName}`;
    });

    // 姓名2--使用到了set
    const fullName2 = computed({
      get: () => {
        return `${user.firstName}_${user.lastName}`;
      },
      set: (newValue: string) => {
        const names = newValue.split("_");
        user.firstName = names[0];
        user.lastName = names[1];
      },
    });

    // 姓名3--使用到了监听
    let fullName3 = ref('');
    // watch(
    //   user,
    //   ({ firstName, lastName }) => {
    //     fullName3.value = `${firstName}_${lastName}`;
    //     console.log('这里发生了执行');
    //   },{immediate:true}
    // );
    // 默认执行一次
    watchEffect(()=>{
      fullName3.value = user.firstName + '_' + user.lastName
      console.log('这里发生了执行');
    })
    // watchEffect(()=>{
    //   const names = fullName3.value.split('_')
    //   user.firstName = names[0]
    //   user.lastName = names[1]
    //   console.log('这里发生了执行');
      
    // })

    // watch中第一个参数如果是数组，数组中的数据组成要么是带有返回值的函数，也么事ref，要么是响应式数据
      watch([()=>user.firstName,()=>user.lastName,fullName3],()=>{
        console.log('--------');
        
      })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    };
  },
});
</script>

<style scoped>
</style>
