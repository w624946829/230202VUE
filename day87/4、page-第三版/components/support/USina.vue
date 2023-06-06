<template>
    <div class="account" v-if="item.accountJoin.sina">
        <div class="join">
            <span>关联平台</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xinlang"></use>
            </svg>
        </div>
        <div class="indent">账号: {{ item.accountJoin.sina }}</div>
        <div class="indent">邮箱: {{ item.accountJoin.email }}</div>
    </div>
  
</template>

<script>
export default {
    name:"USina",
    props:['item'],
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