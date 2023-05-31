
<template>
    <div>
        <div @click="count++">我爱你</div>
        <div>爱了 {{ count }} 次</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 3,
        };
    },
};
</script>

<style scoped>
.box {
    border: 1px solid #333;
}
</style>