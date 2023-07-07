<template>
  <div>不使用actions方式修改状态数据</div>
  <h3>名字:{{ userStore.name }},年龄：{{ userStore.age }}</h3>
  <button @click="updateUser1">批量修改数据：对象方式</button>
  <button @click="updateUser2">批量修改数据：函数方式</button>
  <button @click="updateUser3">批量修改数据：直接修改方式</button>
</template>
  <script lang="ts">
export default {
  name: "UserShow",
};
</script>
  <script lang="ts" setup>
  //获取仓库
  import {userUserStore} from '../store/user.ts' 
  const userStore = userUserStore() 
  // 批量修改数据，方式1 ：对象的形式
  const updateUser1=()=>{
    userStore.$patch({
      name:'张三',
      age:18
    
    })

}

  // 批量修改数据 方式2 ：函数的形式
  const updateUser2 = ()=>{
    console.log('========')
    userStore.$patch((state)=>{
      state.name = '李四'
      state.age = 20
    
    })
  }
  // 批量修改数据，方式3：直接修改
  const updateUser3 = ()=>{
    userStore.$state={
      name:'王五',
      age:22
    }
  }
</script>

  <style scoped>
</style>