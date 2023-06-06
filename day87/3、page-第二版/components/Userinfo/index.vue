<template>
    <div class="item">
            <div class="username">用户名：{{ item.username }}</div>
            <div class="intro">个人介绍：{{ item.intro }}</div>
            <UWechat 
            v-if="item.accountJoin.wechat" :item="item" > </UWechat>
            <UQQ 
            v-if="item.accountJoin.qq"
            :item="item"
            ></UQQ>
            <USina 
            v-if="item.accountJoin.sina"
            :item="item"
            ></USina>
     
        </div>
  
</template>

<script>
import UQQ from "@/components/support/UQQ.vue";
import USina from "@/components/support/USina.vue";
import UWechat from "@/components/support/UWechat.vue";
export default {
    name:"userinfo",
    props:["item"],
    components: {
        UQQ,
        USina,
        UWechat,
    },
}
</script>

<style scoped>
.item {
    margin: 0 auto;
    width: 960px;
    border: 1px solid #333;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
}
</style>