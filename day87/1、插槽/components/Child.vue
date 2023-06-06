<template>
    <div class="box">
        <h5>Child1</h5>
        <hr />
        <slot>我爱你</slot>
        <div>你是个好人</div>
        <slot name="qwer">我们不合适</slot>
        <br />
        <slot name="abc" :asdf="userinfo" :intro="intro">桥梁</slot>
    </div>
</template>

<script>
export default {
    name: "Child",
    data() {
        return {
            userinfo: {
                username: "墩柱",
                age: 30,
            },
            intro: "圆墩柱，方墩柱",
        };
    },
};
</script>

<style scoped>
.box {
    border: 1px solid skyblue;
}
</style>