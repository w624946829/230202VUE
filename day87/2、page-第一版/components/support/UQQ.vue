<template>
    <div class="account" v-if="item.accountJoin.qq">
        <div class="join">
            <span>关联平台</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-QQ"></use>
            </svg>
        </div>
        <div class="indent">账号: {{ item.accountJoin.qq }}</div>
    </div>
  
</template>

<script>
export default {
    name:"UQQ",
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