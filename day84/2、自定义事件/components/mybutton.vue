<template>
    <div class="box">
        <button>随便点</button>
        自己定义的组件
        <br>
        <button @click="btnHandler">点击按钮触发自定义事件</button>
    </div>
</template>

<script>
export default {
    name: "mybutton",
    mounted() {
        setTimeout(() => {
            this.$emit('click')
        }, 2000)
    },
    methods: {
        btnHandler() {
            // 手动触发自定义事件
            this.$emit('yyy', 128, '我爱你')
        }
    }
}
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>