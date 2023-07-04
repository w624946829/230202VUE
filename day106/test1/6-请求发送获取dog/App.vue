<template>
  <h3 v-if="loading">正在加载中。。。。</h3>
  <h3 v-else-if="msgError">错误信息是。。。。</h3>
  <img v-else :src="result.message" alt="">
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import useUrlLoader from '@/hooks/useUrlLoader';
export default defineComponent({
  name: 'App',
  setup () {

    const {loading,result,msgError} = useUrlLoader('https://dog.ceo/api/breeds/image/random')

    return {loading,result,msgError}
  }
})
</script>

<style scoped>

</style>