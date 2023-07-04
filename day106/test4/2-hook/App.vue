<template>
  <h3 v-if="loading">正在加载中。。。</h3>
  <h3 v-else-if="msgError">错误信息是。。。</h3>
  
  <!-- <img v-else-if ="result" :src="result.message" /> -->
  <img v-else-if ="result" :src="result[0].url" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useUrlLoading from '../src/hooks/useUrlLoader'

interface DogData{
  message:string
  status:string
}
interface CatData{
  id:string
  url:string
  width:number
  height:number
}
export default defineComponent({
  name: 'App',
  setup () {
    // const {loading,result,msgError} = useUrlLoading<DogData>(
    //   'https://dog.ceo/api/breeds/image/random'
    // )
    const {loading,result,msgError} = useUrlLoading<CatData>(
      'https://api.thecatapi.com/v1/images/search'
    )

    return {loading,result,msgError}
  }
})
</script>

<style scoped>

</style>