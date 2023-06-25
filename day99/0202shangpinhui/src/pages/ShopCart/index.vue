<template>
    <div>
        <div class="cart" v-if="cartInfoList.length">
            <h4>全部商品</h4>
            <div class="cart-main">
                <div class="cart-th">
                    <div class="cart-th1">全部</div>
                    <div class="cart-th2">商品</div>
                    <div class="cart-th3">单价（元）</div>
                    <div class="cart-th4">数量</div>
                    <div class="cart-th5">小计（元）</div>
                    <div class="cart-th6">操作</div>
                </div>
                <div class="cart-body">
                    <ul class="cart-list" v-for="c in cartInfoList" :key="c.id">
                        <li class="cart-list-con1">
                            <input
                                type="checkbox"
                                name="chk_list"
                                :checked="c.isChecked"
                                @click.prevent="checkOne(c, $event)"
                            />
                        </li>
                        <li class="cart-list-con2">
                            <img :src="c.imgUrl" />
                            <div class="item-msg">{{ c.skuName }}</div>
                        </li>
                        <li class="cart-list-con4">
                            <span class="price">￥{{ c.cartPrice }}</span>
                        </li>
                        <li class="cart-list-con5">
                            <a href="javascript:void(0)" class="mins">-</a>
                            <input
                                autocomplete="off"
                                type="text"
                                minnum="1"
                                class="itxt"
                                :value="c.skuNum"
                            />
                            <a href="javascript:void(0)" class="plus">+</a>
                        </li>
                        <li class="cart-list-con6">
                            <span class="sum"
                                >￥{{ c.skuNum * c.cartPrice }}</span
                            >
                        </li>
                        <li class="cart-list-con7">
                            <a
                                href="#none"
                                class="sindelet"
                                @click="deleteOne(c.skuId)"
                                >删除</a
                            >
                            <br />
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 全选框 -->
            <div class="cart-tool">
                <div class="select-all">
                    <input
                        class="chooseAll"
                        type="checkbox"
                        :checked="isAll"
                        @click.prevent="checkAll"
                    />
                    <span>全选</span>
                </div>
                <div class="option">
                    <a href="#none" @click="batchDelete">删除选中的商品</a>
                </div>
                <div class="money-box">
                    <div class="chosed">
                        已选择 <span>{{ total }}</span
                        >件商品
                    </div>
                    <div class="sumprice">
                        <em>总价（不含运费） ：</em>
                        <i class="summoney">{{ totalPrice }}</i>
                    </div>
                    <div class="sumbtn">
                        <a class="sum-btn" href="###" target="_blank">结算</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 数据为空显示 -->
        <div class="empty" v-if="!cartInfoList.length">
            <img src="http://49.232.112.44/img/empty.751bed26.gif" alt="" />
            <h2>购物车空空如也</h2>
        </div>
    </div>
</template>

<script>
import { reqCartList, reqCheckOne, reqCheckAll, reqDeleteOne,reqBatchDelete } from "@/api";
export default {
    name: "ShopCart",
    data() {
        return {
            cartInfoList: [],
        };
    },
    computed: {
        // 计算是否全选
        isAll() {
            return (
                this.cartInfoList.every((c) => c.isChecked) &&
                this.cartInfoList.length
            );
        },
        total() {
            return this.cartInfoList.reduce(
                (pre, item) => pre + (item.isChecked ? item.skuNum : 0),
                0
            );
        },
        totalPrice() {
            return this.cartInfoList.reduce(
                (pre, item) =>
                    pre + (item.isChecked ? item.skuNum * item.skuPrice : 0),
                0
            );
        },
    },

    methods: {
        // 用于获取购物车数据的方法
        async getCartList() {
            let { code, data, message } = await reqCartList();
            if (code === 200) {
                this.cartInfoList = data[0]?.cartInfoList || [];
            } else {
                alert(`获取购物车数据失败：${message}`);
            }
        },
        // 勾选单个商品的回调
        async checkOne(cartInfo, event) {
            let { checked } = event.target;
            checked = checked ? 1 : 0;
            let { code, message } = await reqCheckOne(cartInfo.skuId, checked);
            if (code === 200) {
                cartInfo.isChecked = checked;
            } else {
                alert("勾选商品失败：" + message);
            }
        },
        // 勾选or取消勾选 所有商品的回调
        async checkAll(event) {
            let { checked } = event.target;
            checked = checked ? 1 : 0;
            const skuIdList = [];
            this.cartInfoList.forEach((c) => skuIdList.push(c.skuId));
            let { code, message } = await reqCheckAll(skuIdList, checked);
            if (code === 200) {
                this.cartInfoList.forEach((c) => (c.isChecked = checked));
            } else {
                alert(`全选商品失败：${message}`);
            }
        },
        async deleteOne(skuId) {
            if (confirm("确定要删除吗？")) {
                let { code, message } = await reqDeleteOne(skuId);
                if (code === 200) {
                    let index = this.cartInfoList.findIndex(
                        (item) => item.skuId === skuId
                    );
                    this.cartInfoList.splice(index, 1);
                }
            } else {
                alert(`删除商品失败：${message}`);
            }
        },
        async batchDelete() {
            if (confirm("确定要删除吗？")) {
                const idList = [];
                this.cartInfoList.forEach((item) => {
                    if (item.isChecked) {
                        idList.push(item.isChecked);
                    }
                });
                let {code,message} = await reqBatchDelete(idList)
                if(code === 200){
                    this.cartInfoList = this.cartInfoList.filter(item=>!item.isChecked)
                }
            } else {
                alert(`删除商品失败：${message}`);
            }
        },
    },
    mounted() {
        this.getCartList();
    },
};
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;
    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }
    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;
            & > div {
                float: left;
            }
            .cart-th1 {
                width: 25%;
                input {
                    vertical-align: middle;
                }
                span {
                    vertical-align: middle;
                }
            }
            .cart-th2 {
                width: 25%;
            }
            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }
        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;
            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;
                & > li {
                    float: left;
                }
                .cart-list-con1 {
                    width: 15%;
                }
                .cart-list-con2 {
                    width: 35%;
                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }
                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }
                .cart-list-con4 {
                    width: 10%;
                }
                .cart-list-con5 {
                    width: 17%;
                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                        text-decoration: none;
                    }
                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 31px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                        text-decoration: none;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }
    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;
                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                    text-decoration: none;
                    &hover {
                        color: white !important;
                    }
                }
            }
        }
    }
}
</style>