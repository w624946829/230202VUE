<template>
    <ul class="list-group">
        <li class="list-group-item">新闻id:{{ $route.params.newsId }}</li>
        <li class="list-group-item">新闻内容:{{ $route.query.content }}</li>
        <hr>
        <li class="list-group-item">新闻内容:{{ type }}</li>
    </ul>
</template>

<script>
export default {
    name: "NewsDetail",
    // mounted() {
    //     console.log(this.$route)
    // }
    data(){
        return {
            typeList:[
                { id: 110, type: '社会新闻' },
                { id: 120, type: '美食新闻' },
                { id: 130, type: '生活新闻' }
            ],
            type:''
        }
    },
    //动态绑定
    // 
    watch:{
        $route:{
            handler(nval,oval){
                this.type = this.typeList.find(item=>{
                    return item.id == nval.params.newsId
                }).type
            },
            deep:true,
            immediate:true
        }
    }
};
</script>

<style scoped>
</style>