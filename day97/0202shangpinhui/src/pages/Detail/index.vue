<template>
    <div class="detail">
        <!-- 商品分类导航 -->
        <TypeNav />

        <!-- 主要内容区域 -->
        <section class="con">
            <!-- 导航路径区域 -->
            <div class="conPoin" v-if="info.categoryView">
                <span v-for="n in 3" :key="n">
                    {{ info.categoryView[`category${n}Name`] }}
                </span>
            </div>

            <!-- 主要内容区域 -->
            <div class="mainCon">
                <!-- 左侧放大镜区域 -->
                <div class="previewWrap">
                    <!--放大镜效果-->
                    <Zoom
                        v-if="info.skuInfo.skuDefaultImg"
                        :imgUrl="info.skuInfo.skuDefaultImg"
                    />
                    <!-- 小图列表 -->
                    <ImageList
                        v-if="info.skuInfo.skuImageList"
                        :list="info.skuInfo.skuImageList"
                    />
                </div>
                <!-- 右侧选择区域布局 -->
                <div class="InfoWrap" v-if="info.skuInfo">
                    <div class="goodsDetail">
                        <h3 class="InfoName">{{ info.skuInfo.skuName }}</h3>
                        <p class="news">{{ info.skuInfo.skuDesc }}</p>
                        <div class="priceArea">
                            <div class="priceArea1">
                                <div class="title">
                                    价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                                </div>
                                <div class="price">
                                    <i>¥</i>
                                    <em>{{ info.price }}</em>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="choose">
                        <div class="chooseArea">
                            <div class="choosed"></div>
                            <!-- 遍历每一个可选属性 -->
                            <dl
                                v-for="attr in info.spuSaleAttrList"
                                :key="attr.id"
                            >
                                <dt class="title">
                                    选择 {{ attr.saleAttrName }}
                                </dt>
                                <dd
                                    :class="{ active: value.isChecked * 1 }"
                                    v-for="value in attr.spuSaleAttrValueList"
                                    :key="value.id"
                                    @click="
                                        changeAttr(
                                            attr.spuSaleAttrValueList,
                                            value.id
                                        )
                                    "
                                >
                                    {{ value.saleAttrValueName }}
                                </dd>
                            </dl>
                        </div>
                        <div class="cartWrap">
                            <div class="controls">
                                <input
                                    autocomplete="off"
                                    class="itxt"
                                    :value="goodsNum"
                                    @change="changeGoodsNum('input',$event)"
                                />
                                <a href="javascript:" class="plus" @click="changeGoodsNum('increment')">+</a>
                                <a href="javascript:" class="mins" @click="changeGoodsNum('decrement')">-</a>
                            </div>
                            <div class="add">
                                <a href="javascript:" @click = "addCart">加入购物车</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { reqGoodsInfo,reqAddToCart } from "@/api";
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";
import { goodsNumReg } from "@/utils/reg";

export default {
    name: "Detail",
    data() {
        return {
            info: {
                skuInfo: {},
            }, //商品详情信息
            goodsNum: 1,
        };
    },
    components: {
        ImageList,
        Zoom,
    },
    methods: {
        //发请求获取详情数据
        async getGoodsInfo() {
            // 获取路由传递过来的商品编号
            const { id } = this.$route.params;
            // 发请求
            let { code, data, message } = await reqGoodsInfo(id);
            //判断业务逻辑是否成功
            if (code === 200) {
                this.info = data;
            } else {
                alert(`获取商品详情数据失败:${message}`);
            }
        },
        // 切换商品属性
        changeAttr(list, id) {
            list.forEach((item) => {
                if (item.id === id) {
                    item.isChecked = "1";
                } else {
                    item.isChecked = "0";
                }
            });
        },
        changeGoodsNum(type, event) {
            switch (type) {
                case "input":
                    // 获取用户的输入
                    let { value } = event.target;
                    // 使用正则表达式进行校验
                    let result = goodsNumReg.test(value);
                    // 判断校验的结果
                    if (result) {
                        console.log("你输入的数量是合法的，我可以给你存入");
                        this.goodsNum = value * 1;
                    } else if (value > 200) {
                        console.log(
                            "你输入的数量超过了200，可以接受，我帮你重置为200"
                        );
                        this.goodsNum = event.target.value = 200;
                    } else {
                        console.log(
                            "你输入的非常不合理，不可以原谅，我帮你重置为1"
                        );
                        this.goodsNum = event.target.value = 1;
                    }
                    break;
                    case "increment":
                        this.goodsNum === 200 ? alert ('最大的购买数量为200') : this.goodsNum += 1 
                        break;

                    case 'decrement':
                        this.goodsNum === 1 ? alert ('最小购买数量为1 ！') : this.goodsNum -= 1 
                        break;
            }

        },
        async addCart(){
            const {id} = this.$route.params
            let {code,message} = await reqAddToCart(id,this.goodsNum)
            if(code === 200 ){
                //跳转到添加购物车路由’
                this.$router.push({
                    path:'/addcart_success'

                })
            }else{
                alert(`商品添加购物车失败：${message}`)
            }
        }
    },
    mounted() {
        // 组件一挂载就发请求获取详情数据
        this.getGoodsInfo();
    },
};
</script>

<style lang="less" scoped>
.detail {
    .con {
        width: 1200px;
        margin: 15px auto 0;

        .conPoin {
            padding: 9px 15px 9px 0;

            & > span + span:before {
                content: "/\00a0";
                padding: 0 5px;
                color: #ccc;
            }
        }

        .mainCon {
            overflow: hidden;
            margin: 5px 0 15px;

            .previewWrap {
                float: left;
                width: 400px;
                position: relative;
            }

            .InfoWrap {
                width: 700px;
                float: right;

                .InfoName {
                    font-size: 14px;
                    line-height: 21px;
                    margin-top: 15px;
                }

                .news {
                    color: #e12228;
                    margin-top: 15px;
                }

                .priceArea {
                    background: #fee9eb;
                    padding: 7px;
                    margin: 13px 0;

                    .priceArea1 {
                        overflow: hidden;
                        line-height: 28px;
                        margin-top: 10px;

                        .title {
                            float: left;
                            margin-right: 15px;
                        }

                        .price {
                            float: left;
                            color: #c81623;

                            i {
                                font-size: 16px;
                            }

                            em {
                                font-size: 24px;
                                font-weight: 700;
                            }

                            span {
                                font-size: 12px;
                            }
                        }

                        .remark {
                            float: right;
                        }
                    }

                    .priceArea2 {
                        overflow: hidden;
                        line-height: 28px;
                        margin-top: 10px;

                        .title {
                            margin-right: 15px;
                            float: left;
                        }

                        .fixWidth {
                            width: 520px;
                            float: left;

                            .red-bg {
                                background: #c81623;
                                color: #fff;
                                padding: 3px;
                            }

                            .t-gray {
                                color: #999;
                            }
                        }
                    }
                }

                .support {
                    border-bottom: 1px solid #ededed;
                    padding-bottom: 5px;

                    .supportArea {
                        overflow: hidden;
                        line-height: 28px;
                        margin-top: 10px;

                        .title {
                            margin-right: 15px;
                            float: left;
                        }

                        .fixWidth {
                            width: 520px;
                            float: left;
                            color: #999;
                        }
                    }
                }

                .choose {
                    .chooseArea {
                        overflow: hidden;
                        line-height: 28px;
                        margin-top: 10px;

                        dl {
                            overflow: hidden;
                            margin: 13px 0;

                            dt {
                                margin-right: 15px;
                                float: left;
                            }

                            dd {
                                float: left;
                                margin-right: 5px;
                                color: #666;
                                line-height: 24px;
                                padding: 2px 14px;
                                border-top: 1px solid #eee;
                                border-right: 1px solid #bbb;
                                border-bottom: 1px solid #bbb;
                                border-left: 1px solid #eee;
                                cursor: pointer;

                                &.active {
                                    color: green;
                                    border: 1px solid green;
                                }
                            }
                        }
                    }

                    .cartWrap {
                        .controls {
                            width: 48px;
                            position: relative;
                            float: left;
                            margin-right: 15px;

                            .itxt {
                                width: 38px;
                                height: 35px;
                                border: 1px solid #ddd;
                                color: #555;
                                float: left;
                                border-right: 0;
                                text-align: center;
                            }

                            .plus,
                            .mins {
                                width: 15px;
                                text-align: center;
                                height: 17px;
                                line-height: 17px;
                                background: #f1f1f1;
                                color: #666;
                                position: absolute;
                                right: -8px;
                                border: 1px solid #ccc;
                            }

                            .mins {
                                right: -8px;
                                top: 19px;
                                border-top: 0;
                            }

                            .plus {
                                right: -8px;
                            }
                        }

                        .add {
                            float: left;

                            a {
                                background-color: #e1251b;
                                padding: 0 25px;
                                font-size: 16px;
                                color: #fff;
                                height: 36px;
                                line-height: 36px;
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }

    .product-detail {
        width: 1200px;
        margin: 30px auto 0;
        overflow: hidden;

        .aside {
            width: 210px;
            float: left;
            border: 1px solid #ccc;

            .tabWraped {
                height: 40px;

                h4 {
                    border-top: 3px solid #fff;
                    float: left;
                    line-height: 37px;
                    width: 105px;
                    text-align: center;
                    border-bottom: 1px solid #ccc;

                    &.active {
                        border-top: 3px solid #e1251b;
                        border-bottom: 0;
                        font-weight: normal;
                    }
                }
            }

            .tabContent {
                padding: 10px;

                .tab-pane {
                    display: none;

                    &.active {
                        display: block;
                    }

                    &:nth-child(1) {
                        .partList {
                            overflow: hidden;

                            li {
                                width: 50%;
                                float: left;
                                border-bottom: 1px dashed #ededed;
                                line-height: 28px;
                            }
                        }

                        .goodsList {
                            & > li {
                                margin: 5px 0 15px;
                                border-bottom: 1px solid #ededed;
                                padding-bottom: 5px;

                                .list-wrap {
                                    .p-img {
                                        text-align: center;

                                        img {
                                            width: 152px;
                                        }
                                    }

                                    .price {
                                        font-size: 16px;
                                        color: #c81623;
                                    }

                                    .operate {
                                        text-align: center;
                                        margin: 5px 0;

                                        a {
                                            background-color: transparent;
                                            border: 1px solid #8c8c8c;
                                            color: #8c8c8c;
                                            display: inline-block;
                                            padding: 2px 14px;
                                            line-height: 18px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .detail {
            width: 980px;
            float: right;

            .fitting {
                border: 1px solid #ddd;
                margin-bottom: 15px;

                .kt {
                    border-bottom: 1px solid #ddd;
                    background: #f1f1f1;
                    color: #333;
                    padding: 5px 0 5px 15px;
                }

                .good-suits {
                    height: 170px;
                    padding-top: 10px;

                    .master {
                        width: 127px;
                        height: 165px;
                        text-align: center;
                        position: relative;
                        float: left;

                        img {
                            width: 87px;
                        }

                        p {
                            color: #c81623;
                            font-size: 16px;
                            font-weight: 700;
                        }

                        i {
                            position: absolute;
                            top: 48px;
                            right: -25px;
                            font-size: 16px;
                        }
                    }

                    .suits {
                        width: 668px;
                        height: 165px;
                        float: left;

                        .suitsItem {
                            float: left;
                            width: 127px;
                            padding: 0 20px;
                            text-align: center;

                            img {
                                width: 120px;
                                height: 130px;
                            }

                            p {
                                font-size: 12px;
                            }

                            label {
                                display: block;
                                position: relative;

                                input {
                                    vertical-align: middle;
                                }

                                span {
                                    vertical-align: middle;
                                }
                            }
                        }
                    }

                    .result {
                        border-left: 1px solid #ddd;
                        width: 153px;
                        height: 165px;
                        padding-left: 20px;
                        float: left;

                        .num {
                            font-size: 14px;
                            margin-bottom: 10px;
                            margin-top: 10px;
                        }

                        .price-tit {
                            font-weight: bold;
                            margin-bottom: 10px;
                        }

                        .price {
                            color: #b1191a;
                            font-size: 16px;
                            margin-bottom: 10px;
                        }

                        .addshopcar {
                            background-color: #e1251b;
                            border: 1px solid #e1251b;
                            padding: 10px 25px;
                            font-size: 16px;
                            color: #fff;
                            display: inline-block;
                            box-sizing: border-box;
                        }
                    }
                }
            }

            .intro {
                .tab-wraped {
                    background: #ededed;
                    // border: 1px solid #ddd;
                    overflow: hidden;

                    li {
                        float: left;

                        & + li > a {
                            border-left: 1px solid #ddd;
                        }

                        &.active {
                            a {
                                // border: 0;
                                background: #e1251b;
                                color: #fff;
                            }
                        }

                        a {
                            display: block;
                            height: 40px;
                            line-height: 40px;
                            padding: 0 11px;
                            text-align: center;
                            color: #666;
                            background: #fcfcfc;
                            border-top: 1px solid #ddd;
                            border-bottom: 1px solid #ddd;
                        }
                    }
                }

                .tab-content {
                    .tab-pane {
                        display: none;

                        &.active {
                            display: block;
                        }

                        &:nth-child(1) {
                            .goods-intro {
                                padding-left: 10px;

                                li {
                                    margin: 10px 0;
                                }
                            }

                            .intro-detail {
                                img {
                                    width: 100%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>