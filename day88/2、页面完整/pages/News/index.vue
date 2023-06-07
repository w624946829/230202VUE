<template>
    <div role="tabpanel" class="tab-panel" id="News">
        <ul class="list-group">
            <li 
            class="list-group-item" 
            v-for="item in list" 
            :key="item.id">
                {{ item.content }}
                <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
                    @click="toDetail(item)"
                >{{item.id}}</button>
            </li>
            
        </ul>
        <button @click ="backHandler">后退</button>
        <div class="alert alert-success" role="alert">
                <router-view></router-view>
            </div>
    </div>
</template>

<script>
export default {
    name: "News",
    data() {
        return {
            list: [
                { id: 110, content: "高考加油" },
                { id: 120, content: "绝味鸭脖,降价啦" },
                { id: 130, content: "洗衣机" },
            ],
        };
    },
    methods: {
        // 、、后退
        backHandler(){
            this.$router.back();//回到上一步
        }, 

        toDetail(item) {
            //之前的是声明式导航
            // 现在使用编程式导航
            // 方式一，
            // this.$router.push('/home/news/')

            // 方式三，对象形式
            // this.$router.push({
            //     name: "NewsDetail",
            //     params: {
            //         newsId: item.id,
            //     },
            //     query: {
            //         content: item.content,
            //     },
            // });
            //push跳转有历史记录
            // replace跳转不会有历史记录
            this.$router.replace({
                name: "NewsDetail",
                params: {
                    newsId: item.id,
                },
                query: {
                    content: item.content,
                },
            })
            //重复点击报错，是由于重复渲染组件出的警告，直接把错误catch住，不打印就行
            //1、通过catch解决
            // .catch(err=>{})
            // 2、
        },
    },
};
</script>

<style scoped>
</style>