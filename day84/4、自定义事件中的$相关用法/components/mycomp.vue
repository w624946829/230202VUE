<template>
    <div class="box">
        <h3>这是子组件</h3>
        <button @click="clickHandler">修改父组件中的username</button>
        <br>
        <button @click="$emit('mmm')">触发mmm事件</button><br>
        <button @click="$emit('nnn')">触发nnn事件</button><br>
    </div>
</template>

<script>
export default {
    name: "mycomp",
    methods: {
        clickHandler() {
            this.$emit('xxx', '火')
        }
    }
}
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>