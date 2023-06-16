<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div class="nav-left" @mouseleave="hideSort">
                <h2 class="all" @mouseenter="isShowSort = true">
                    全部商品分类
                </h2>

                <transition
                    enter-active-class="animate_fadeIn"
                    leave-active-class="animate_fadeOut"
                >
                    <div class="sort animate_animated" v-show="isShowSort">
                        <div class="all-sort-list2" @click="toSearch">
                            <div
                                class="item"
                                v-for="c1 in categoryList"
                                :key="c1.categoryId"
                            >
                                <!-- 遍历一级分类 -->
                                <h3>
                                    <a
                                        data-level="1"
                                        :data-id="c1.categoryId"
                                        >{{ c1.categoryName }}</a
                                    >
                                </h3>
                                <div class="item-list clearfix">
                                    <!-- 遍历二级分类 -->
                                    <div
                                        class="subitem"
                                        v-for="c2 in c1.categoryChild"
                                        :key="c2.categoryId"
                                    >
                                        <dl class="fore">
                                            <dt>
                                                <a
                                                    data-level="2"
                                                    :data-id="c2.categoryId"
                                                    >{{ c2.categoryName }}</a
                                                >
                                            </dt>
                                            <dd>
                                                <em
                                                    v-for="c3 in c2.categoryChild"
                                                    :key="c3.categoryId"
                                                >
                                                    <a
                                                        data-level="3"
                                                        :data-id="c3.categoryId"
                                                        >{{
                                                            c3.categoryName
                                                        }}</a
                                                    >
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <!--  -->
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import "animate.css";
import { mapState } from "vuex";
export default {
    name: "TypeNav",
    data() {
        return {
            isShowSort: this.$route.path === "/home",
        };
    },
    //计算属性
    computed: {
        ...mapState("home", ["categoryList"]),
    },
    methods: {
        //跳转search理由的
        toSearch(event) {
            // event.target中拿到自定义的数据以及innerText
            // 获取点击分类的level、id、innerText(名称)
            const {
                innerText,
                dataset: { id, level },
            } = event.target;
            //获取当前的keyword
            const { keyword } = this.$route.query;
            // 通过调用它的 push 方法，可以实现路由的跳转
            //判断点击的是否为分类链接
            if (level) {
                // 跳转路由
                this.$router.push({
                    path: "/search",
                    
                    query: {
                        [`category${level}Id`]: id,
                        categoryName: innerText,
                        keyword,
                    },
                });
            }
            //让子集菜单消失
            this.isShowSort = false;
        },
        hideSort() {
            if (this.$route.path !== "/home") {
                this.isShowSort = false;
            }
        },
    },

    mounted() {
        //组件挂挂载后，获取数据并存入vuex
        this.$store.dispatch("home/getCategoryList");
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;
            animation-duration: 0.5s;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;
                        &:hover {
                            background-color: #ea4a36;
                            a {
                                color: white;
                            }
                        }
                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;
                        a:hover {
                            color: #ea4a36;
                        }

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }

                    a {
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>