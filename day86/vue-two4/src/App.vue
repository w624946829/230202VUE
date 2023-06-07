<template>
    <div class="container">
        
        <hr>
        <Header></Header>
        <Main></Main>
    </div>
</template>

<script>

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
    }
}
</script>

<style scoped>

</style>