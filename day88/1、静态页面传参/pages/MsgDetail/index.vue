<template>
    <div class="alert alert-success" role="alert">
            <ul class="list-group">
                <li class="list-group-item">消息的id:{{$route.params.msgId}}</li>
                <li class="list-group-item">消息的内容:{{$route.query.content}}</li>
               
            </ul>
        </div>
  
</template>

<script>
export default {
    name:"MsgDetail",
    //mounted(){
        // this.$router //router实例 -》router=>route路由
        // this.$route //当前路由，当前需要渲染的route路由
    // }
}
</script>

<style scoped>

</style>