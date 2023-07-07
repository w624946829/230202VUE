<template>
  <div style="background: #ccc; height: 50px;">
    <span>小明每次花100元</span>
    <button @click="spendMoney(100)">花钱</button>
    爸爸还剩 {{money}} 元
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Child',
    props: ['money'],
    methods: {
      spendMoney (count) {
        console.log('测试')
        this.$emit('update:money', this.money - count)
      }
    }
  }
</script>
