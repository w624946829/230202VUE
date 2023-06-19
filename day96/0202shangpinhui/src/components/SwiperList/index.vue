<!--
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-16 09:02:46
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-16 10:25:53
 * @FilePath: \day94\0202shangpinhui\src\components\SwipList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <swiper class="swiper" :options="swiperOption" v-if="list.length">
        <!-- 每一屏 -->
        <swiper-slide
            v-for="item in list"
            :key="item.id"
        >
            <img :src="item.imgUrl" />
        </swiper-slide>

        <!-- 小圆点 -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- 上一张 -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <!-- 下一张 -->
        <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
    name: "SwiperList",
    components:{Swiper,SwiperSlide},
    props: ['list','options'],
    data() {
        return {
            swiperOption: {
                slidesPerView: 1, //同时展示几张
                spaceBetween: 20, //屏与屏之间的距离
                loop: true, //是否开启循环轮播
                speed: 1000, //切换速度
                autoplay: {
                    delay: 3000, //延迟时间（每一屏看多久）
                    stopOnLastSlide: true, //最后一张是否停止（当开启循环轮播时会失效）
                    disableOnInteraction: false, //产生交互后是否继续轮播
                },
                //小圆点相关配置
                pagination: {
                    el: ".swiper-pagination", //小圆点所在容器
                    clickable: true, //小圆点是否可以点击
                },
                // 上一张、下一张
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                ...this.options,
            },
        };
    },
};
</script>

<style scoped>
</style>