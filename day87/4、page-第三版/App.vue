<template>
    <div class="container">
        <!-- 
            第三版：
            目前，如果我们的数据多增加一个平台的话，那么必须要去修改userinfo这个组件
            解决方式
            把userinfo里面的可变内容通过插槽的形式传入进去即可

            作用于插槽
            v-if = “item.accountJoin.wechat”
            变成
            v-if = "accountJoin.wechat"
            少一层item
            
            发现：有组件嵌套组件的现象
            

         -->

        <Userinfo
            v-for="item in userlist"
            :key="item.id"
            :item="item"
            #default="{ accountJoin }"
        >
            <UWechat v-if="accountJoin.wechat" :item="item"></UWechat>
            <UQQ v-if="accountJoin.qq" :item="item"></UQQ>
            <USina v-if="accountJoin.sina" :item="item"></USina>
        </Userinfo>
    </div>
</template>

<script>
import Userinfo from "@/components/Userinfo";
import UQQ from "@/components/support/UQQ.vue";
import USina from "@/components/support/USina.vue";
import UWechat from "@/components/support/UWechat.vue";
export default {
    name: "App",
    components: {
        UQQ,
        USina,
        UWechat,
        Userinfo,
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