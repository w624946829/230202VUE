<template>
    <div>
        <h3>App</h3>
        <hr>
        <div>store中的count: {{ count }}</div>
        
        <div>store中的tenflodCount: {{ tenflodCount }}</div>
        <button @click="increment">自增</button>
        <button @click="decrement">自减</button>
        <button @click="isEvenIncrement">偶数自增</button>
        <button @click="asyncIncrement">2s后自增</button>
     

        <br>
        <br>
        <br>
        <div>store中的msg: {{ msg }}</div>
        <button @click="changeMsg('flower')">修改msg</button>
        <!-- 模块化 -->
        <mybutton></mybutton>
    <br><br><br>
    <!-- 命名空间 -->
        <mycomp></mycomp>

    </div>
</template>

<script>
//vuex的辅助函数 - 辅助开发者
// mapState-辅助state
import {mapState,mapGetters,mapActions} from "vuex"
import mybutton from '@/components/mybutton'
import mycomp from '@/components/mycomp'



export default {
    name: "App",
    components:{mybutton,mycomp},
    computed:{
        //返回值是一个对象，对象的属性名是 state中的数据名， 属性值是一个函数，放到了computed中，变成了一个属性，直接算出了结果
// 参数是一个数组，数组中写想要映射的数据名
        ...mapState(['count','msg']),
        //把getters中的属性直接映射过来
        ...mapGetters(['tenflodCount'])
    },
    methods:{
        ...mapActions(['increment','decrement','isEvenIncrement','asyncIncrement','changeMsg'])
    }

}
</script>

<style scoped>

</style>