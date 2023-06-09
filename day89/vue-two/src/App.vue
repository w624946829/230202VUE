<template>
    <div class="container">
        <h4>App组件</h4>
        <hr>

        <!-- <MyHtml></MyHtml>
        <MyAtt></MyAtt>
        <MyEvent></MyEvent> -->
        <!-- <MyFor></MyFor> -->
        <!-- <MyModel></MyModel> -->
        <!-- <MyDirective></MyDirective> -->
        <MyComp></MyComp>
 <MySlot></MySlot>
    </div>
  
</template>

<script>
import MyHtml from '@/components/MyHtml';
import MyAtt from '@/components/MyAtt';
import MyEvent from '@/components/MyEvent';
import MyFor from '@/components/MyFor';
import MyModel from '@/components/MyModel';
import MyDirective from '@/components/MyDirective';
import MyComp from '@/components/MyComp';
import MySlot from './components/MySlot'
export default {
    name:"App",
    components:{MyHtml,MyAtt,MyEvent,MyFor,MyModel,MyDirective,MyComp,MySlot}
}
</script>

<style scoped>
.container {
    width: 800px;
    margin: 0 auto;
}
</style>