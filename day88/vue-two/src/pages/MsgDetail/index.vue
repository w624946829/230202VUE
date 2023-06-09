<template>
    <ul class="list-group">
        <li class="list-group-item">消息的id:{{ $route.params.msgid }}</li>
        <li class="list-group-item">消息的内容：{{ $route.query.content }}</li>

<div>传参</div>
<li class="list-group-item">消息的id:{{ msgid }}</li>
        <li class="list-group-item">消息的内容：{{ content }}</li>
        <li class="list-group-item">text：{{ text }}</li>
    </ul>
</template>

<script>
export default {
    name: "MsgDetail",
    props:['msgid','content','text']




    // mounted(){
    //     console.log(this.$route);
    // }

};
</script>

<style scoped>
</style>