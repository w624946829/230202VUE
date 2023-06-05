<template>
    <div class="row">
        <h1 v-if="$store.state.isFirst">欢迎光临</h1>
        <h1 v-else-if="$store.state.isLoading">正在加载...</h1>
        <h2 v-else-if="$store.state.errorMessage">{{ $store.state.errorMessage }}</h2>
        <div
            v-else
            class="card"
            v-for="item in $store.state.userlist"
            :key="item.id"
        >
            <a :href="item.htmlUrl" target="_blank">
                <img
                    :src="item.avatar"
                    style="width: 100px"
                />
            </a>
            <p class="card-text">{{ item.username }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: "Main",
};
</script>

<style scoped>
</style>