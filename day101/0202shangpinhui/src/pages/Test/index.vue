<template>
  <div class="demo">
    <h1>{{a}}</h1>
    <button @click="add">点我+1</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

  export default {
    name:'Test',
    computed:{
      ...mapState(['a'])
    },
    methods:{
      async add(){
        try{
        await this.$store.dispatch('jia',1)
        console.log('@');
        }catch(error){
          console.log(error);
        }
        
      }
    }
}
</script>

<style lang="less" scoped>
  .demo {
    h1 {
      font-size: 50px;
    }
    font-size: 40px;
  }
</style>