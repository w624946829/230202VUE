<template>
    <div class="box">
        <h4>mycomp组件</h4>
        <div>count:{{ $store.state.mycomp.count }}</div>
        <div>tenflodCount:{{ $store.getters["mycomp/tenflodCount"] }}</div>
        <button @click="addHandler">自增</button>
        <hr />
        <div>count:{{ count }}</div>
        <!-- <div>tenflodCount{{ this['mycomp/tenflodCount'] }}</div> -->
        <div>tenflodCount{{ tenflodCount }}</div>
        <button @click="increment">自增</button>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    name: "mycomp",
    computed: {
        ...mapState({
            count: (state) => state.mycomp.count,
        }),
        // ...mapGetters(['mycomp/tenflodCount'])
        //推荐写法
        // 参数一、放命名空间的名称
        // 参数二、放数组，数组中放改命名空间下的getters属性
        ...mapGetters("mycomp", ["tenflodCount"]),
    },
    methods: {
        addHandler() {
            this.$store.dispatch("mycomp/increment");
        },
        ...mapActions('mycomp',["increment"]),
    },
};
</script>

<style scoped>
.box {
    padding: 10px;
    border: 1px solid hotpink;
}
</style>