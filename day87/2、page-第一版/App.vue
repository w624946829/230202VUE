<template>
    <div class="container">
        <!-- 版本1：正常封装组件 -->
        <div class="item" v-for="item in userlist" :key="item.id">
            <div class="username">用户名：{{ item.username }}</div>
            <div class="intro">个人介绍：{{ item.intro }}</div>
            <UWechat :item="item"></UWechat>
            <UQQ :item="item"></UQQ>
            <USina :item="item"></USina>
        </div>
    </div>
</template>

<script>
import UQQ from "./components/support/UQQ.vue";
import USina from "./components/support/USina.vue";
import UWechat from "./components/support/UWechat.vue";
export default {
    name: "App",
    components: {
        UQQ,
        USina,
        UWechat,
    },
    data() {
        return {
            userlist: [
                {
                    id: 1001,
                    username: "admin",
                    intro: "这个是管理员账号,请勿修改",
                    accountJoin: {
                        wechat: "admin-wechat",
                        flag: "UWechat",
                    },
                    createDate: 1645184446523,
                },
                {
                    id: 1002,
                    username: "zhangsan",
                    intro: "一个乐观的开发者",
                    accountJoin: {
                        qq: "465258674",
                        flag: "UQQ",
                    },
                    createDate: 1645182446523,
                },
                {
                    id: 1003,
                    username: "lisi",
                    intro: "这一个沮丧的开发者",
                    accountJoin: {
                        sina: "会飞的猪",
                        email: "huifeidezhu@163.com",
                        flag: "USina",
                    },
                    createDate: 1645144446523,
                },
            ],
        };
    },
};
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