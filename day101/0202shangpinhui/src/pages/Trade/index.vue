<template>
    <div class="trade-container">
        <h3 class="title">填写并核对订单信息</h3>
        <div class="content">
            <h5 class="receive">收件人信息</h5>
            <!-- 每一个收货人信息 -->
            <div
                class="address clearFix"
                v-for="add in tradeInfo.userAddressList"
                :key="add.id"
            >
                <span
                    class="username"
                    :class="{ selected: add.isDefault == 1 }"
                    >{{ add.consignee }}</span
                >
                <p @click="changeAddress(add.id)">
                    <span class="s1">{{ add.fullAddress }}</span>
                    <span class="s2">{{ add.phoneNum }}</span>
                    <span class="s3" v-show="add.isDefault == 1">默认地址</span>
                </p>
            </div>
            <div class="line"></div>
            <h5 class="pay">支付方式</h5>
            <div class="address clearFix">
                <span class="username selected">在线支付</span>
            </div>
            <div class="line"></div>
            <h5 class="pay">送货清单</h5>
            <div class="detail">
                <h5>商品清单</h5>

                <ul
                    class="list clearFix"
                    v-for="detail in tradeInfo.detailArrayList"
                    :key="detail.skuId"
                >
                    <li>
                        <img :src="detail.imgUrl" alt="" />
                    </li>
                    <li>
                        <p>{{ detail.skuName }}</p>
                        <h4>7天无理由退货</h4>
                    </li>
                    <li>
                        <h3>￥{{ detail.orderPrice }}</h3>
                    </li>
                    <li>X{{ detail.skuNum }}</li>
                    <li>有货</li>
                </ul>
            </div>
            <div class="bbs">
                <h5>买家留言：</h5>
                <textarea
                    v-model="orderComment"
                    placeholder="建议留言前先与商家沟通确认"
                    class="remarks-cont"
                ></textarea>
            </div>
            <div class="line"></div>
        </div>
        <div class="money clearFix">
            <ul>
                <li>
                    <b
                        ><i>{{ tradeInfo.totalNum }}</i
                        >品类，总商品金额</b
                    >
                    <span>¥{{ tradeInfo.originalTotalAmount }}</span>
                </li>
            </ul>
        </div>
        <div class="trade">
            <div class="price">
                应付金额:　<span>¥{{ tradeInfo.totalAmount }}</span>
            </div>
            <div class="receiveInfo">
                寄送至:
                <span>{{ showAddressInfo.fullAddress }}</span>
                收货人：<span>{{ showAddressInfo.consignee }}</span>
                <span>{{ showAddressInfo.phoneNum }}</span>
            </div>
        </div>
        <div class="sub clearFix">
            <!-- <router-link class="subBtn" to="/pay" >提交订单</router-link> -->
            <a class="subBtn" @click="submitOrder()">提交订单</a>
        </div>
    </div>
</template>

<script>
import { reqTradeInfo,reqSubmitOrder } from "@/api";

export default {
    name: "Trade",
    data() {
        return {
            tradeInfo: {},
            orderComment: "",
        };
    },
    computed: {
        showAddressInfo() {
            return (
                this.tradeInfo.userAddressList?.find(
                    (item) => item.isDefault == 1
                ) || {}
            );
        },
    },
    methods: {
        // 获取交易的信息
        async getTradeInfo() {
            let { code, message, data } = await reqTradeInfo();
            if (code === 200) {
                this.tradeInfo = data;
            } else {
                this.$message.warning(message);
            }
        },
        // 点击切换收货地址
        changeAddress(id) {
            this.tradeInfo.userAddressList.forEach((item) => {
                item.id === id
                    ? (item.isDefault = "1")
                    : (item.isDefault = "0");
            });
        },
        async submitOrder() {
            // 准备好提交订单的一切参数
            // 获取交易编号、获取要最终智富的商品列表
            const { tradeNo, detailArrayList } = this.tradeInfo;
            // 获取订单备注
            const { orderComment } = this;
            // 获取收货信息
            const { consignee, phoneNum, fullAddress } = this.showAddressInfo;
            const paramsObj = {
                tradeNo,
                consignee,
                consigneeTel: phoneNum,
                deliveryAddress: fullAddress,
                paymentWay: "ONLINE",
                orderComment,
                orderDetailList: detailArrayList,
            };
            let {code,message,data} = await reqSubmitOrder(tradeNo,paramsObj)
        if(code === 200){
          this.$message.success('订单提交成功！')
          this.$router.push({
            path:'/pay',
            query:{id:data}
          })
        }else{
          this.$message.warning(message)
        }
        },
    },
    mounted() {
        this.getTradeInfo();
    },
};
</script>

<style lang="less" scoped>
.trade-container {
    .title {
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
        line-height: 21px;
    }

    .content {
        width: 1200px;
        margin: 10px auto 0;
        border: 1px solid rgb(221, 221, 221);
        padding: 25px;
        box-sizing: border-box;

        .receive,
        .pay {
            line-height: 36px;
            margin: 18px 0;
        }

        .address {
            padding-left: 20px;
            margin-bottom: 15px;

            .username {
                float: left;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #ddd;
                position: relative;
            }

            .username::after {
                content: "";
                display: none;
                width: 13px;
                height: 13px;
                position: absolute;
                right: 0;
                bottom: 0;
                background: url(./images/choosed.png) no-repeat;
            }

            .username.selected {
                border-color: #e1251b;
            }

            .username.selected::after {
                display: block;
            }

            p {
                width: 610px;
                float: left;
                line-height: 30px;
                margin-left: 10px;
                padding-left: 5px;
                cursor: pointer;

                .s1 {
                    float: left;
                }

                .s2 {
                    float: left;
                    margin: 0 5px;
                }

                .s3 {
                    float: left;
                    width: 56px;
                    height: 24px;
                    line-height: 24px;
                    margin-left: 10px;
                    background-color: #878787;
                    color: #fff;
                    margin-top: 3px;
                    text-align: center;
                }
            }

            p:hover {
                background-color: #ddd;
            }
        }

        .line {
            height: 1px;
            background-color: #ddd;
        }

        .way {
            width: 1080px;
            height: 110px;
            background: #f4f4f4;
            padding: 15px;
            margin: 0 auto;

            h5 {
                line-height: 50px;
            }

            .info {
                margin-top: 20px;

                .s1 {
                    float: left;
                    border: 1px solid #ddd;
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    margin-right: 10px;
                }

                p {
                    line-height: 30px;
                }
            }
        }

        .detail {
            width: 1080px;

            background: #feedef;
            padding: 15px;
            margin: 2px auto 0;

            h5 {
                line-height: 50px;
            }

            .list {
                display: flex;
                justify-content: space-between;

                img {
                    width: 100px;
                }

                li {
                    line-height: 30px;

                    p {
                        margin-bottom: 20px;
                    }

                    h4 {
                        color: #c81623;
                        font-weight: 400;
                    }

                    h3 {
                        color: #e12228;
                    }
                }
            }
        }

        .bbs {
            margin-bottom: 15px;

            h5 {
                line-height: 50px;
            }

            textarea {
                width: 100%;
                border-color: #e4e2e2;
                line-height: 1.8;
                outline: none;
                resize: none;
            }
        }

        .bill {
            h5 {
                line-height: 50px;
            }

            div {
                padding-left: 15px;
            }
        }
    }

    .money {
        width: 1200px;
        margin: 20px auto;

        ul {
            width: 220px;
            float: right;

            li {
                line-height: 30px;
                display: flex;
                justify-content: space-between;

                i {
                    color: red;
                }
            }
        }
    }

    .trade {
        box-sizing: border-box;
        width: 1200px;
        padding: 10px;
        margin: 10px auto;
        text-align: right;
        background-color: #f4f4f4;
        border: 1px solid #ddd;

        div {
            line-height: 30px;
        }

        .price span {
            color: #e12228;
            font-weight: 700;
            font-size: 14px;
        }

        .receiveInfo {
            color: #999;
        }
    }

    .sub {
        width: 1200px;
        margin: 0 auto 10px;

        .subBtn {
            float: right;
            width: 164px;
            height: 56px;
            font: 700 18px "微软雅黑";
            line-height: 56px;
            text-align: center;
            color: #fff;
            background-color: #e1251b;
        }
    }
}
</style>