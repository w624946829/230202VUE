<template>
    <div class="box">
        <h4>mybutton</h4>
        <hr />
        <div>count: {{ $store.state.mybutton.count }}</div>

        <button @click="addCount">自增</button>
        <button @click="subCount">自减</button>
        <button @click="addCountIncrement">偶数自增</button>
        <button @click="asyncCountIncrement">2s后自增</button>

        <br />
        <h5>辅助函数</h5>
        <div>count: {{ count }}</div>
        <button @click="incrementCount">自增</button>
        <button @click="decrementCount">自减</button>
        <button @click="isEvenIncrementCount">偶数自增</button>
        <button @click="asyncIncrementCount">2s后自增</button>
    </div>
</template>

<script>
//在这个组件中使用count这个数据，和之前的count不是一个count
// 这个count也不能放在store中，并且不能改名字
// 使用模块化
// 在4个核心配置项中配置modules，这个属性用来配置模块

// 辅助函数
import {mapState,mapGetters,mapActions} from 'vuex'
export default {
    name: "mybutton",
    computed:{
        ...mapState({
            count:state=> state.mybutton.count
        }),
    
    },

    methods: {
        addCount() {
            this.$store.dispatch("incrementCount");
        },
        subCount() {
            this.$store.dispatch("decrementCount");
        },
        addCountIncrement() {
            this.$store.dispatch("isEvenIncrementCount");
        },
        asyncCountIncrement() {
            this.$store.dispatch("asyncIncrementCount");
        },


        ...mapActions(['incrementCount','decrementCount','isEvenIncrementCount','asyncIncrementCount',])
    },
};
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>