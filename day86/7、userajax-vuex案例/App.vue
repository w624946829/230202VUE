<template>
    <div>
        <h3>App</h3>
        <hr />
        <div>store中的count:{{ count }}</div>
        <div>store中的tenflodCount:{{ tenflodCount }}</div>
        <button @click="increment">自增</button>
        <button @click="decrement">自减</button>
        <button @click="isEvenIncrement">偶数自增</button>
        <button @click="asyncIncrement">异步自增</button>
        <hr>
        <div>msg:{{msg }}</div>
        <button @click="changeMsg('燕子')">修改msg</button>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
//vuex辅助函数-辅助开发者
// mapState -- 辅助state  ---- 映射
export default {
    name: "App",
    computed: {
        ...mapState(["count","msg"]),

        ...mapGetters(["tenflodCount"]),
    },
    methods: {
        ...mapActions([
            "increment",
            "decrement",
            "isEvenIncrement",
            "asyncIncrement",
            "changeMsg"
        ]),
    },
};
</script>

<style scoped>
</style>