<template>
    <div role="tabpanel" class="tab-panel" id="News">
                <ul class="list-group">
                    <li class="list-group-item" 
                        v-for="item in list"
                        :key="item.id"
                    >
                        {{item.content}}
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
                <button @click="backHandler">后退</button>
                <div class="alert alert-success" role="alert">
                   <router-view></router-view>
                </div>
            </div>
  
</template>

<script>
export default {
    name:"News",
     data() {
        return {
            list: [
                { id: 110, content: '高考加油' },
                { id: 120, content: '绝味鸭脖,降价啦' },
                { id: 130, content: '洗衣机' }
            ]
        }
    },
    methods:{
        backHandler(){
            this.$router.back()
        },
        toDetail(item){

            // 进行传参
            // this.$router.push(`/home/news/newsdetail/${ item.id }?content=${ item.content }`)

            //push有历史记录，replace没有历史记录
            this.$router.replace({
                name:'NewsDetail',
                
                params:{
                    newsId:item.id
                },
                query:{
                    content:item.content
                }
            })
        }
    }
}
</script>

<style scoped>

</style>