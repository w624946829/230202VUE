<template>
  <div class="box">
    <span style="margin-right: 10px">{{title}}</span>
    <input type="text" :value="otherProps1" @input="$emit('update:otherProps1', ($event.target as HTMLInputElement).value)"><span>{{otherProps1}}</span>
     <input type="text" :value="otherProps2" @input="$emit('update:otherProps2', ($event.target as HTMLInputElement).value)"><span>{{otherProps2}}</span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CustomInput'
}
</script>
<script lang="ts" setup>
defineProps(['title', 'otherProps1','otherProps2'])
</script>