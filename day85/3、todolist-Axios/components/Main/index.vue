<template>
    <div class="row">
        <h1 v-if="isFirst">欢迎光临</h1>
        <h1 v-else-if="isLoading">正在加载...</h1>
        <h2 v-else-if="errorMessage">{{ errorMessage }}</h2>
        <div
            v-else
            class="card"
            v-for="item in userlist"
            :key="item.id"
        >
            <a :href="item.htmlUrl" target="_blank">
                <img
                    :src="item.avatar"
                    style="width: 100px"
                />
            </a>
            <p class="card-text">{{ item.username }}</p>
            <!-- <p class="card-text">reactjs</p> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Main",
    data() {
        return {
            userlist: [],
            isFirst: true, // isFirst为true代表刷新页面展示欢迎页
            isLoading: false, // true代表是loading状态,false代表不加载状态
            errorMessage: '', // 错误信息,如果这个数据有值,代表页面发生错误,展示错误信息
        };
    },
    mounted() {
        this.$bus.$on("reciveKeyword", this.reciveKeyword);
    },

    methods: {
        async reciveKeyword(keyword) {
            keyword = keyword.trim();
            if (!keyword) {
                alert("请输入内容");
                return;
            }
            this.isFirst = false;//准备开始发送请求了，不再是欢迎页状态
            this.isLoading = true;
            try {
                let result = await axios.get(`https://api.github.com/search/users?q=${keyword}`)
                    this.userlist = result.data.items.map(user => {
                            return {
                                id: user.id, // 唯一标识
                                avatar: user.avatar_url, // 头像
                                username: user.login, // 昵称(用户名)
                                htmlUrl: user.html_url, // 用户主页
                            };
                        });
                        this.isLoading = false
            } catch (error) {
                this.isLoading = false
                this.errorMessage = (error && error.message)||'加载失败请重试'
                console.log(error);
                return 
            }
        },
        //发送请求
    },
};
</script>

<style scoped>
</style>