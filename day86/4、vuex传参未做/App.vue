<template>
    <div>
        <h3>App</h3>
        <hr />
        <div>store中的count{{ count }}</div>
        <div>store中的tenflodCount:{{ tenflodCount }}</div>
        <button @click="increment">自增</button>
        <button @click="decrement">自减</button>
        <button @click="isEvenIncrement">偶数自增</button>
        <button @click="asyncIncrement">2秒后自增</button>
    </div>
</template>

<script>
//vuex辅助函数- 辅助开发者（之前的写法太难，可以使用辅助函数）
// mapState - 辅助state
import {mapState,mapGetters,mapActions} from 'vuex'

//返回值是一个对象，对象的属性名是 state中的数据名，属性值是一个函数，放到了computed中，就变成了一个属性，直接算出接过来

// mapState(['count'])

export default {
    name: "App",
    computed:{
        // 参数是一个数组，数组中写想要映射的数据名 
        ...mapState(['count']),
        //把getters中的属性，直接映射到页面上
        ...mapGetters(['tenflodCount'])
    },
    methods:{
        //把actions中的方法映射过来
        ...mapActions(['increment', 'decrement', 'isEvenIncrement', 'asyncIncrement'])
    }
};
</script>

<style scoped>
</style>