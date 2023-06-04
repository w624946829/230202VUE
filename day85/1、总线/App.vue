<template>
    <div>
      <mycomp></mycomp>
        <hr>
        <mybutton></mybutton>
    </div>
  
</template>

<script>
import mycomp from'./components/mycomp.vue'
import mybutton from'./components/mybutton.vue'

export default {
    name:"App",
    components:{mycomp,mybutton}
}
</script>

<style scoped>

</style>