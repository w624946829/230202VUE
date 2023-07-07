<template>
    <div>不使用action方式修改状态数据</div>
    <h3>名字：{{ userStore.name }},年龄：{{ userStore.age }}</h3>
    <button @click="updateUser1"> 批量修改数据：对象方式 </button>
    <button @click="updateUser2"> 批量修改数据：函数方式 </button>
    <button @click="updateUser3"> 批量修改数据：直接修改方式 </button>
</template>
<script lang="ts">
export default {
    name: 'UserShow'
}
</script>
<script lang="ts" setup>
import {useUserStore} from '../store/user'
const userStore = useUserStore()
const updateUser1 = ()=>{
    userStore.$patch({
        name:'李四',
        age:57
    })
}
const updateUser2 = ()=>{
    userStore.$patch((state)=>{
        state.name = '王五'
        state.age = 58
    })
}
const updateUser3 = ()=>{
    userStore.$state = {
        name:'赵六',
        age:59
    }
}
</script>
<style scoped>
</style>