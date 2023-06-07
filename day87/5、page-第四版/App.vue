<template>
    <div class="container">
        <!-- 
            第四版：
            require.context 自动引入文件
            components 动态渲染页面
            

         -->

        <Userinfo
            v-for="item in userlist"
            :key="item.id"
            :item="item"
            #default="{ accountJoin }"
        >
        <component :is ="compObj[accountJoin.flag]" :item="item"></component>

           
        </Userinfo>
    </div>
</template>

<script>
import Userinfo from "@/components/Userinfo";
const ctx = require.context('./components/support',false,/\.vue/)
export default {
    name: "App",
    components: {
        
        Userinfo,
    },
    computed:{
        compObj(){
            let obj = {}
            ctx.keys().forEach(path=>{
                let module = ctx(path)
                let comp = module.default
                let compName = path.replace('./','').replace('.vue','')
                obj[compName] = comp

            })
            console.log(obj);
            return obj
        }
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