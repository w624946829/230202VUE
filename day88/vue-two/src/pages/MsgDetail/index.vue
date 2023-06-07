<template>
   
        <ul class="list-group">
            <li class="list-group-item">消息的id:{{ $route.params.msgId }}</li>
            <li class="list-group-item">
                消息的内容:{{ $route.query.content }}
            </li>
            <hr />
            <li class="list-group-item">消息的id: {{ msgId }}</li>
            <li class="list-group-item">消息的内容: {{ content }}</li>
            <li class="list-group-item">text: {{ text }}</li>
        </ul>
    
</template>

<script>
export default {
    name: "MsgDetail",
    props: ["msgId", "content", "text"],
    //mounted(){
    // this.$router //router实例 -》router=>route路由
    // this.$route //当前路由，当前需要渲染的route路由
    // }
};
</script>

<style scoped>
</style>