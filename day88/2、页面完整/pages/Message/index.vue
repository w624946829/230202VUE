<template>
    <div role="tabpanel" class="tab-panel active" id="Message">
        <ul class="list-group">
            <li class="list-group-item" v-for="item in list" :keyy="item.id">
                <!-- 
                    router-link三种写法
                    1、字符串拼接
                    2、模板字符串
                    3、对象
                        现象：使用对象形式的时候 path和 params配置使用，会丢失params参数
                        由于params的丢失，导致url匹配不到路由，所以页面不会展示组件
                        丢参数和匹配不到路由是两码事情
                        解决：两方面
                        匹配不到路由
                            可以给站位加一个问号，变成params参数 可传可不传
                        丢参数
                            -- 两个思路：
                            1、可以在path上拼接上params参数（不常用）
                            2、不用path用name、、、、同时在路由上添加相同的name
                            给当前的这个route起一个名字，在跳转的时候使用这个名字


                 -->
                <!-- 方式1 -->
                <router-link
                    :to="`/home/message/msgdetail/${item.id}?content=${item.content}`"
                >
                    {{ item.content }}</router-link
                >
                <!-- 方式二 -->
                <!-- <router-link  
                :to="'/home/message/msgdetail/' + item.id + '?content=' + item.content"> {{ item.content }}</router-link> -->
                <!-- 方式三 对象 -->
                <!-- 存在问题 -->
                <!-- <router-link  :to="{
                    path:'/home/message/msgdetail',
                    params:{
                        msgId:item.id
                    },
                    querry:{
                        content:item.content
                    },
                    }"> {{ item.content }}</router-link> -->
                <!-- 解决一 -->
                <!-- <router-link  :to="{
                    path:'/home/message/msgdetail' + item.id,
                    querry:{
                        content:item.content
                    },
                    }"> {{ item.content }}</router-link> -->

                <!-- 解决二  -->
                <!-- <router-link :to="{
                    name: 'MsgDetail',
                    params: {
                        msgId: item.id
                    },
                    query: {
                        content: item.content
                    }
                }">{{ item.content }}</router-link> -->
            </li>
        </ul>
        <div class="alert alert-success" role="alert">
            <router-view></router-view>
        </div>
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
                { id: 101, content: "桩基" },
                { id: 102, content: "墩柱" },
                { id: 103, content: "盖梁" },
            ],
        };
    },
};
</script>

<style scoped>
</style>