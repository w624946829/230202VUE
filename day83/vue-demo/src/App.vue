
<template>
    <div>
        <h2>App根组件</h2>
        <hr />
        <mybutton></mybutton>
    </div>
</template>

<script>
//App.vue 组件作为整个页面的根组件，所有的内容都写在App.vue中

import mybutton from "./component/mybutton.vue";
// 引入这个mybutton是一个配置项，由.vue文件export default默认暴露的一个对象
export default {
    name: "",
    //局部注册
    components: {
        mybutton:mybutton,
    },
};
</script>

<style scoped>
</style>