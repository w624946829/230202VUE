<template>
    <div class="box">
        <h6>Child2组件</h6>
        <hr>
        <div>单独使用作用域插槽</div>
        <slot :userinfo ="userinfo" :intro="intro"></slot>
    </div>
  
</template>

<script>
export default {
    name:"Child2",
    data(){
        return {
            userinfo:{
                username:'墩柱',
                age:30
            },
            intro:'圆墩柱，方墩柱'
        }
    }
}
</script>

<style scoped>
.box {
    border: 1px solid red;
}
</style>