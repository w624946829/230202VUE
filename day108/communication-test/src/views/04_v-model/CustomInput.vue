<template>
  <div class="box">
    <span style="margin-right: 10px">{{title}}</span>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue',($event.target as HTMLInputElement).value)" /> <span>{{modelValue}}</span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CustomInput'
}
</script>
<script lang="ts" setup>
// defineProps(['title', 'modelValue'])
defineProps(['title','modelValue'])
</script>