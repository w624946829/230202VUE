<template>
    <div role="tabpanel" class="tab-pane active" id="Message">
        <ul class="list-group">
            <li v-for="item in list" :key="item.id" class="list-group-item">
                <!-- 第一种 字符串拼接 -->

                <!-- 第二种  模版字符串-->
                <!-- <router-link
                    :to="`/home/message/msgdetail/${item.id}?content=${item.content}`"
                    >{{ item.content }}</router-link
                > -->
                <!-- 第三种  对象 -->
                <!-- <router-link
                    :to="{
                        path: '/home/message/msgdetail/' + item.id,
                        
                        query: {
                            content: item.content,
                        },
                    }"
                    >{{ item.content }}</router-link> -->

                    <router-link
                    :to="{
                       
                        name:'MsgDetail',
                         params:{
                           msgid: item.id,
                         } ,
                        query: {
                            content: item.content,
                        },
                        

                    }"
                    >{{ item.content }}</router-link>
            </li>
        </ul>
        <div class="alert alert-success" role="alert">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Message",
    data() {
        return {
            list: [
                { id: 101, content: "我爱你高圆圆" },
                { id: 102, content: "我爱你杨幂" },
                { id: 103, content: "我爱你胡歌" },
            ],
        };
    },
};
</script>

<style scoped>
</style>