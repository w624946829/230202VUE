<template>
    <div class="account" v-if="item.accountJoin.wechat">
        <div class ='join'>
            <span>关联平台</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weixin"></use>
            </svg>
            </div>
            <div class="indent">账号：{{item.accountJoin.wechat}}</div> 
      
    </div>
  
</template>

<script>
export default {
    name:"UWechat",
    props:['item']
}
</script>

<style scoped>
.indent{
        margin-left:20px
    }
    .icon{
        margin-left:20px
    }
</style>