<template>
    <div>
      
        <!-- 三级导航 -->
        <TypeNav></TypeNav>
        <!-- 商品分类导航 -->
        <ListContainer></ListContainer>
        <!-- 今日推荐 -->
		<Recommend/>
		<!-- 商品排行 -->
		<Rank/>
		<!-- 喜欢 -->
		<Like/>
		<!-- 楼层 -->
		<Floor/>
		<Floor/>
		<!-- 商标 -->
		<Brand/>
    </div>
</template>

<script>

import ListContainer from "./ListContainer";
import Recommend from './Recommend'
	import Rank from './Rank'
	import Like from './Like'
	import Floor from './Floor'
	import Brand from './Brand'


export default {
    name: "Home",
    components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
};
</script>

<style lang="less" scoped>

</style>