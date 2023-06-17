<template>
    <swiper class="swiper" :options="swiperOption" v-if="list.length">
        <!-- 每一屏 -->

        <swiper-slide v-for="item in list" :key="item.id">
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
    components:{ Swiper, SwiperSlide },
    props:['list','options'],
    data() {
        return {
            swiperOption: {
                slidesPerView: 1, //同时展示 几张
                spaceBetween: 30, //屏与屏的距离
                loop: true, //是否开启循环轮播
                speed: 1000, //切换速度
                autoplay: {
                    //自动轮播
                    delay: 3000, //延迟时间
                    // stopOnLastSlide: false, //在最后一屏处是否停止;;与loop冲突
                    disableOnInteraction: false, //产生交互后是否轮播
                },
                pagination: {
                    //(分页器）小圆点相关
                    el: ".swiper-pagination", //小圆点所在容器
                    clickable: true, //小圆点是否可以点击
                },
                //上一张、下一章
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                ...this.options
            },
        };
    },
};
</script>

<style scoped>
</style>