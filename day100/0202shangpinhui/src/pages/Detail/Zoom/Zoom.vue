<template>
  <div class="spec-preview">
    <img :src="url || imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="url || imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>

  export default {
    name: "Zoom",
    data(){
      return {
        url:''
      }
    },
    props:['imgUrl'],
    methods:{
      move(event){
        //获取鼠标位置
        let mouseX = event.offsetX
        let mouseY = event.offsetY
        //获取遮罩DOM元素、大图DOM元素
        let {mask,bigImg} = this.$refs
        //计算遮罩的坐标
        let maskX = mouseX - (mask.offsetWidth/2)
        let maskY = mouseY -(mask.offsetHeight /2)
        //重置遮罩的位置
        if(maskX < 0 ){
          maskX = 0 
        }else if(maskX >mask.offsetWidth){
          maskX = mask.offsetWidth
        }
        if(maskY < 0 ){
          maskY = 0 
        }else if(maskY >mask.offsetHeight){
          maskY = mask.offsetHeight
        }
        //让遮罩动起来
        mask.style.left = maskX + 'px'
        mask.style.top = maskY + 'px'

        //让大图动起来
        bigImg.style.left = -2*maskX + 'px'
        bigImg.style.top = -2*maskY + 'px'
      },
      saveUrl(value){
        this.url = value
      }
    },
    mounted() {
          //给总线绑定事件，用于接收新的图片地址
          this.$bus.$on('send-imgurl',this.saveUrl)
        },
    beforeDestroy(){
        this.$bus.$off('send-imgurl')
      }


  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>