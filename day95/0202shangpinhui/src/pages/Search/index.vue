<template>
    <div class="outer">
        <!-- 三级分类导航 -->
        <!-- <div>{{ $route.query }}</div> -->

        <TypeNav />
        <div class="main">
            <div class="py-container">
                <!--面包屑导航-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <span href="#">全部结果</span>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 面包屑_分类名 -->
                        <li class="with-x" v-show="searchParams.categoryName">
                            分类：{{ searchParams.categoryName }}
                            <i @click="removeCategoryName">×</i>
                        </li>

                        <!-- 面包屑关键词 -->
                        <li class="with-x" v-show="searchParams.keyword">
                            关键词：{{ searchParams.keyword }}
                            <i @click="removeKeyword">×</i>
                        </li>

                        <!-- 面包屑品牌 -->
                        <li class="with-x" v-show="searchParams.trademark">
                            关键词：{{ searchParams.trademark.split(":")[1] }}
                            <i @click="removeTrademark">×</i>
                        </li>

                        <!-- 面包屑属性 -->
                        <li class="with-x" v-for="(p,index) in searchParams.props" :key="index">
							{{attrText(p)}}
							<i @click="removeProps(index)">×</i>
				
                        </li>
                    </ul>
                </div>
			
                <!-- 搜索器 -->
                <SearchSelector
                    :attrsList="searchInfo.attrsList"
                    :trademarkList="searchInfo.trademarkList"
                    :sendTrademark="saveTrademark"
                    @send-attrvalue="saveAttrValue"
                />

                <!--商品展示区-->
                <div class="details clearfix">
                    <!-- 列表操作区 -->
                    <!-- <div cl ass="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li class="active">
                                    <a href="#">综合</a>
                                </li>
                                <li>
                                    <a href="#">销量</a>
                                </li>
                                <li>
                                    <a href="#">新品</a>
                                </li>
                                <li>
                                    <a href="#">评价</a>
                                </li>
                                <li>
                                    <a href="#">价格⬆</a>
                                </li>
                                <li>
                                    <a href="#">价格⬇</a>
                                </li>
                            </ul>
                        </div>
                    </div> -->
                    <!-- 商品列表 -->
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <!-- 每一个商品 -->
                            <li
                                class="yui3-u-1-5"
                                v-for="goods in searchInfo.goodsList"
                                :key="goods.id"
                            >
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a href="item.html" target="_blank">
                                            <!-- 商品图片  -->
                                            <img :src="goods.defaultImg"
                                        /></a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{ goods.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a
                                            target="_blank"
                                            href="item.html"
                                            title=""
                                            v-html="goods.title"
                                        ></a>
                                    </div>
                                    <div class="commit">
                                        <i class="command"
                                            >已有<span>2000</span>人评价</i
                                        >
                                    </div>
                                    <div class="operate">
                                        <a
                                            href="success-cart.html"
                                            target="_blank"
                                            class="sui-btn btn-bordered btn-danger"
                                            >加入购物车</a
                                        >
                                        <a
                                            href="javascript:void(0);"
                                            class="sui-btn btn-bordered"
                                            >收藏</a
                                        >
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 分页器 -->

					<Pagination 
                    :total="searchInfo.total" 
						:pageSize="searchParams.pageSize" 
						:pageNo="searchParams.pageNo" 
						:continues="5"
						:sendPageNo="savePageNo" /> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchSelector from './SearchSelector'
import { reqSearchInfo } from "@/api";
export default {
    name: "Search",
    components: {
        SearchSelector,
    },
    data() {
        return {
            searchParams: {
                category1Id: "", //一级分类id
                category2Id: "", //二级分类
                category3Id: "", //三级分类id
                categoryName: "", //分类名称
                keyword: "", //关键词
                props: [], //商品属性
                trademark: "", //品牌
                order: "", //排序方式
                pageNo: 1, //页码（当前页）
                pageSize: 5, //页大小（每页展示多少条）
            },
            //搜索的结果对象
            searchInfo: {},
        };
    },

    methods: {
        // 执行器
        async executeSearch() {
            let { code, data, message } = await reqSearchInfo(
                this.searchParams
            );
            if (code === 200) {
                this.searchInfo = data;
            } else {
                alert(`搜索失败：${message}`);
            }
        },

        // 移除关键词
        removeCategoryName() {
            //路径中要去除  categoryName、category?Id
            // 若有关键词，要保留关键词
            // 重新搜索一下
            const { keyword } = this.$route.query;
            this.$router.push({
                path: "/search",
                query: { keyword },
            });
        },
        removeKeyword() {
            // 尝试获取当前所有的路由参数
            const { query } = this.$route;
            //重新跳转搜索路由
            this.$router.push({
                path: "/search",
                query: {
                    ...query,
                    keyword: undefined,
                },
            });
            // 通过总线通知header组件清楚关键词
            this.$bus.$emit("clear-keyword");
        },
        // 保存子组件 传递过来的品牌数据
        saveTrademark(tm) {
            console.log(
                "我是父组件，收到了子组件传递过来的品牌数据",
                tm.tmId,
                tm.tmName
            );
            // 将子组件传递过来的品牌，拼接成一个符合后端接口要求的字符串
            this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`;
            // 发请求去搜索
            this.executeSearch();
        },
        // 移除品牌的回调
        removeTrademark() {
            this.searchParams.trademark = "";
            this.executeSearch();
        },
        // 保存子组件（searchSelector） 传递过来的属性数据
        saveAttrValue(attr, attrValue) {
            console.log("传送", attr.attrName, attrValue);
            // 根据从传递过来的属性信息，拼接一个符合服务器接口要求的字符串
            const str = `${attr.attrId}:${attrValue}:${attr.attrName}`;
              // 判断属性是否重复
			const result = this.searchParams.props.includes(str);
			if (!result) {
                // 将字符串推入props
                this.searchParams.props.push(str);
                // 重新搜索一下
                this.executeSearch();
            }
        },
		// 格式化写法
		attrText(p){
			return p.split(':')[2] +':'+ p.split(':')[1]
		},
		// 移除属性
		removeProps(index){
			this.searchParams.props.splice(index,1)
			this.executeSearch();
		},
        // 
        savePageNo(val){
            console.log('在分页器组件那边点击了',val);
            this.searchParams.pageNo = val
        }
        
    },
    watch: {
  

        $route: {
            immediate: true,
            handler({ query }) {
                console.log(query);
                Object.assign(
                    this.searchParams,
                    {
                        category1Id: "", //重置一级分类id
                        category2Id: "", //重置二级分类id
                        category3Id: "", //重置三级分类id
                        categoryName: "", //重置分类名
                    },
                    query
                );
                this.executeSearch();
            },
        },
		searchParams:{
			deep:true,
			handler(){
				this.executeSearch();
			}
		
		}

    },
};
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .page {
                width: 733px;
                height: 66px;
                overflow: hidden;
                float: right;

                .sui-pagination {
                    margin: 18px 0;

                    ul {
                        margin-left: 0;
                        margin-bottom: 0;
                        vertical-align: middle;
                        width: 490px;
                        float: left;

                        li {
                            line-height: 18px;
                            display: inline-block;

                            a {
                                position: relative;
                                float: left;
                                line-height: 18px;
                                text-decoration: none;
                                background-color: #fff;
                                border: 1px solid #e0e9ee;
                                margin-left: -1px;
                                font-size: 14px;
                                padding: 9px 18px;
                                color: #333;
                            }

                            &.active {
                                a {
                                    background-color: #fff;
                                    color: #e1251b;
                                    border-color: #fff;
                                    cursor: default;
                                }
                            }

                            &.prev {
                                a {
                                    background-color: #fafafa;
                                }
                            }

                            &.disabled {
                                a {
                                    color: #999;
                                    cursor: default;
                                }
                            }

                            &.dotted {
                                span {
                                    margin-left: -1px;
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    font-size: 14px;
                                    border: 0;
                                    padding: 9px 18px;
                                    color: #333;
                                }
                            }

                            &.next {
                                a {
                                    background-color: #fafafa;
                                }
                            }
                        }
                    }

                    div {
                        color: #333;
                        font-size: 14px;
                        float: right;
                        width: 241px;
                    }
                }
            }
        }
    }
}
</style>