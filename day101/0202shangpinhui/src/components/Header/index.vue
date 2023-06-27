<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <!-- 不登录才能呈现的元素 -->
                    <p v-show="!info.id">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register"
                            >免费注册</router-link
                        >
                        <router-link to="/test" class="register"
                            >测试</router-link
                        >
                    </p>

                    <!-- 登录之后可以呈现的 -->
                    <p v-show="info.id">
                        <span>{{ info.nickName }}</span>
                        <a class="register" @click="quit">退出登录</a>
                        <router-link to="/test" class="register"
                            >测试</router-link
                        >
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <!-- <a href="###">我的购物车</a> -->
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="尚品汇" to="/home">
                    <img src="./images/logo.png" alt="" @click="keyword = ''" />
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input
                        type="text"
                        id="autocomplete"
                        class="input-error input-xxlarge"
                        v-model="keyword"
                    />
                    <button
                        class="sui-btn btn-xlarge btn-danger"
                        type="button"
                        @click="toSearch"
                    >
                        搜索
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "Header",
    data() {
        return {
            keyword: "",
        };
    },
    methods: {
        toSearch() {
            //第一种方法
            // this.$router.push('/search',()=>{})
            //第二种方法
            // this.$router.push('/search').catch(()=>{})
            // this.$router.push('/search')

            this.$router.push({
                path: "/search",
                query: {
                    ...this.$route.query,
                    keyword: this.keyword || undefined,
                },
            });
        },
        clearKeyword() {
            this.keyword = "";
        },
        // 退出登录
        quit(){
            if(confirm('确定要退出吗')){
                this.$store.dispatch('quit')
            }
        }
    },
    mounted() {
        this.$bus.$on("clear-keyword", this.clearKeyword);
    },
    beforeDestroy() {
        this.$bus.$off("clear-keyword");
    },
    computed:{
        ...mapState({
            info:state=>state.user.info
        })
    }
};
</script>

<style lang="less" scoped>
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>