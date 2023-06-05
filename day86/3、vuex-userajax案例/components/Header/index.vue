<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input type="text" placeholder="enter the name you search" v-model="keyword"/>
            <button @click="btnHandler">Search</button>
        </div>
    </section>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        btnHandler() {
            // this.$bus.$emit('reciveKeyword', this.keyword)
            this.$store.dispatch('getUserList', this.keyword)
        }
    }
}
</script>

<style scoped>

</style>