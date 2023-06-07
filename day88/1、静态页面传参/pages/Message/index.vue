<template>
    <div role="tabpanel" class="tab-panel active" id="Message">
        <ul class="list-group">
            <li
                class="list-group-item"
               v-for ="item in list "
               :keyy="item.id"
            >
                
                <router-link  
                :to="`/home/message/msgdetail/${item.id}?content=${item.content}`"> {{ item.content }}</router-link>
            
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
//路由参数
// 分两种：params和query传参

    // 101是参数，是可以变得，叫params参数
    // 问号之后的参数叫query参数
// 步骤
// 1、传
//      /home/message/msgdetail/101?content=我爱你高圆圆
//      在路径中拼接上参数即可，可以拼params和query参数
// 2、站位
        // 如果没有params参数，不需要占位，有params就必须站位，否则匹配不到路径
// 3、接
    // $router.params 接params参数
    // $router.query 接query参数
    // $route 当前路由
    // $router router路由器实例

export default {
    name: "Message",
    data() {
        return {
            list: [
                { id: 101,content: "桩基" },
                { id: 102,content: "墩柱" },
                { id: 103,content: "盖梁" },
            ],
        };
    },
};
</script>

<style scoped>
</style>