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
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
// vue-resource 插件 - 用来发请求,和axios几乎一样
import VueResource from 'vue-resource' // 这是一个vue的官方插件包
import Vue from 'vue'
Vue.use(VueResource)
export default {
    name: "Main",
    data() {
        return {
            userlist: [],
            isFirst: true, // isFirst为true代表刷新页面展示欢迎页
            isLoading: false, // true代表是loading状态,false代表不加载状态
            errorMessage: '', // 错误信息,如果这个数据有值,代表页面发生错误,展示错误信息
        }
    },
    mounted() {
        this.$bus.$on('reciveKeyword', this.reciveKeyword)
    },
    methods: {
        async reciveKeyword(keyword) {
            keyword = keyword.trim()
            if (!keyword) {
                alert('请输入内容')
                return
            }

            this.isFirst = false; // 开始准备发请求了,不再是欢迎页状态
            this.isLoading = true;


            try {
                let result = await this.$http.get(`https://api.github.com/search/users?q=${ keyword }`)
                this.userlist = result.data.items.map(user => {
                    return {
                        id: user.id, // 唯一标识
                        avatar: user.avatar_url, // 头像
                        username: user.login, // 昵称(用户名)
                        htmlUrl: user.html_url // 用户主页
                    }
                })
                this.isLoading = false
            } catch (error) {
                this.errorMessage = error.message
                this.isLoading = false
                console.error(error)
            }

            // this.$http.get(`https://api.github.com/search/users?q=${ keyword }`)
            // .then(res => {
            //     console.log(res)
            // })
            // .catch(err => {
            //     console.error(err)
            // })


            // try {
            //     let result = await axios.get(`https://api.github.com/search/users?q=${ keyword }`)
            //     this.userlist = result.data.items.map(user => {
            //         return {
            //             id: user.id, // 唯一标识
            //             avatar: user.avatar_url, // 头像
            //             username: user.login, // 昵称(用户名)
            //             htmlUrl: user.html_url // 用户主页
            //         }
            //     })
            //     this.isLoading = false
            // } catch (error) {
            //     this.isLoading = false
            //     this.errorMessage = (error && error.message) || '加载失败,请重试'
            //     console.error(error)
            //     return
            // }


            // 发请求
            // axios.get(`https://api.github.com/search/users?q=${ keyword }`)
            // .then(res => {
            //     this.userlist = res.data.items.map(user => {
            //         return {
            //             id: user.id, // 唯一标识
            //             avatar: user.avatar_url, // 头像
            //             username: user.login, // 昵称(用户名)
            //             htmlUrl: user.html_url // 用户主页
            //         }
            //     })
            // })
            // .catch(err => {
            //     console.error(err)
            //     // console.log(err)
            //     // console.dir(err)
            //     // console.info(err)
            //     // console.warn(err)
            //     // console.error(err)
            // })
        }
    }
};
</script>

<style scoped>
</style>