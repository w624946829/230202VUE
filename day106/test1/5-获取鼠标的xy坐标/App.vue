<template>
  <h3>x:{{ x }},y:{{ y }}</h3>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import usePosition from './usePosition'

export default defineComponent({
  name: 'App',
  setup () {
    const {x,y} = usePosition() 
    return {
      x,y
    }
  }
})
</script>

<style scoped>

</style>