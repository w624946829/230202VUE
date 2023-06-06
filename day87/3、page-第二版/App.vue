<template>
    <div class="container">
        
    

        <!-- 
            1.5版本：把循环的列表封装成一个组件
        直接把循环list的div黏贴到组件中，发现v-for卸载跟标签上，会报错
        必须只有一个跟标签，循环就有多个了，所以报错
        循环的代码还放在外部，把循环出来的item传给组件
         -->
        <Userinfo
         v-for="item in userlist" :key="item.id" :item="item"
        ></Userinfo>
        
    </div>
</template>

<script>
import Userinfo from "@/components/Userinfo"

export default {
    name: "App",
    components: {
        Userinfo
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