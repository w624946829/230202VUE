<template>
  <div id = 'app'>
        <div v-for="(item,index) in list" :key=" index">{{index}}--{{item.id}} -- {{item.content}}</div>

    </div>
</template>

<script>
  export default {
    name:'00',
    
  }
</script>

<style scoped>
  
</style>