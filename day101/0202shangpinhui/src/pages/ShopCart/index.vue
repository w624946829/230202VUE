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
                            <a
                                href="javascript:void(0)"
                                class="mins"
                                @click="changeSkuNum('decrement', c)"
                                >-</a
                            >
                            <input
                                autocomplete="off"
                                type="text"
                                class="itxt"
                                :value="c.skuNum"
                                @change="changeSkuNum('input', c, $event)"
                            />
                            <a
                                href="javascript:void(0)"
                                class="plus"
                                @click="changeSkuNum('increment', c)"
                                >+</a
                            >
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
                        <router-link class="sum-btn" to="/trade"
                            >结算</router-link
                        >
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
import {
    reqCartList,
    reqCheckOne,
    reqCheckAll,
    reqDeleteOne,
    reqBatchDelete,
    reqAddToCart,
} from "@/api";
import { goodsNumReg } from "@/utils/reg";

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
        async checkOne(cartInfo,event){
        // 获取勾选状态（勾选 不勾选）
        let {checked} = event.target
        // 根据勾选与不勾选（true 或 false），赋一个符合服务器要求的值（1 或 0）
        checked = checked ? 1 : 0
        // 联系服务器勾选
        let {code,message} = await reqCheckOne(cartInfo.skuId,checked)
        // 判断业务逻辑
        if(code === 200){
          // 维护本地数据
          cartInfo.isChecked = checked
        }else {
          alert(`勾选商品失败：${message}`)
        }
      },
        // 删除单个商品的回调
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
        // 删除多个商品的回调
        async batchDelete() {
            if (confirm("确定要删除吗？")) {
                const idList = [];
                this.cartInfoList.forEach((item) => {
                    if (item.isChecked) {
                        idList.push(item.isChecked);
                    }
                });
                let { code, message } = await reqBatchDelete(idList);
                if (code === 200) {
                    this.cartInfoList = this.cartInfoList.filter(
                        (item) => !item.isChecked
                    );
                } else {
                    alert(`删除商品失败：${message}`);
                }
            }
        },

        // 修改商品数量的回调
        async changeSkuNum(type, info, event) {
            if (this.isLock) {
                console.log("锁定中。。。。");
                return;
            }
            this.isLock = true;
            //    获取需要修改的商品id
            const { skuId, skuNum } = info;

            switch (type) {
                case "increment":
                    if (skuNum === 200) {
                        alert("最大购买数量为200");
                    } else {
                        let { code, message } = await reqAddToCart(skuId, 1);
                        if (code === 200) {
                            info.skuNum += 1;
                            info.isChecked = 1;
                        } else {
                            alert(`修改商品数量失败,${message}`);
                        }
                    }

                    break;
                case "decrement":
                    if (skuNum === 1) {
                        alert("最小购买数量为1");
                    } else {
                        let { code, message } = await reqAddToCart(skuId, -1);
                        if (code === 200) {
                            info.skuNum -= 1;
                            info.isChecked = 1;
                        } else {
                            alert(`修改商品数量失败,${message}`);
                        }
                    }
                    break;
                case "input":
                    // 获取用户的输入
                    const { value } = event.target;
                    // 校验输入
                    if (goodsNumReg.test(value)) {
                        const disNum = value - skuNum;
                        let { code, message } = await reqAddToCart(
                            skuId,
                            disNum
                        );
                        if (code === 200) {
                            info.skuNum = value * 1;
                            info.isChecked = 1;
                        } else {
                            //清空页面
                            event.target.value = skuNum;
                            alert(`修改商品数量失败：${message}`);
                        }
                    } else if (value > 200) {
                        // 输入的不合法，但是可以原谅，原因是输入的太多
                        const disNum = 200 - skuNum;
                        // 发请求
                        let { code, message } = await reqAddToCart(
                            skuId,
                            disNum
                        );
                        // 判断业务逻辑
                        if (code === 200) {
                            // 维护本地数据
                            // 第一种更新
                            // info.skuNum = event.target.value =  200;
                            // 第二种 vue自带强制更新（效率可能存在问题）
                            info.skuNum = 200;
                            this.$forceUpdate();
                        } else {
                            //清空页面，避免页面残留
                            event.target.value = skuNum;
                            alert(`修改商品数量失败：${message}`);
                        }
                    } else {
                        // 输入的不合法，且不可原谅
                        event.target.value = skuNum;
                    }
                    break;
            }
            this.isLock = false;
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