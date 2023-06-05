<template>
    <div class="container">
        <button @click="getUserinfo">测试跨域</button>
        <Header></Header>
        <Main></Main>
    </div>
</template>

<script>
import axios from "axios"
import Header from '@/components/Header'
import Main from '@/components/Main'
export default {
    name: "App",
    components: {
        Header,
        Main,
    },
    data() {
        return {
            userinfo: {
                uasername: '张三',
                age: 18,
                weight: 180
            },
        }
    },
    methods:{
        async getUserinfo(){
            try{
                // 发生跨域
            // let res = await axios.get('http://localhost:3000/getUserInfo')
            let res = await axios.get(`/api/getUserInfo`)
            console.log(res)
            }catch(error){
                console.error(error);
            }
        }
    }
}
</script>

<style scoped>

</style>