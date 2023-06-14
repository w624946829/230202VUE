<template>
    <swiper class="swiper" :options="swiperOption">
        <!-- 每一屏 -->
        <swiper-slide class="item">Slide 1</swiper-slide>
        <swiper-slide class="item">Slide 2</swiper-slide>
        <swiper-slide class="item">Slide 3</swiper-slide>
        <swiper-slide class="item">Slide 4</swiper-slide>
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
    name: "Test",
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 1, //同时展示 几张
                spaceBetween: 30, //屏与屏的距离
                loop: true, //是否开启循环轮播
                speed:1000,//切换速度
                autoplay: {
                    //自动轮播
                    delay: 1500, //延迟时间
                    // stopOnLastSlide: false, //在最后一屏处是否停止;;与loop冲突
                    disableOnInteraction: false,//产生交互后是否轮播
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
            },
        };
    },
};
</script>
  
  <style lang="less" scoped>
.item {
    height: 300px;
    font-size: 40px;
    background-image: linear-gradient(45deg, red, yellow, green);
    text-align: center;
    line-height: 200px;
}
</style>