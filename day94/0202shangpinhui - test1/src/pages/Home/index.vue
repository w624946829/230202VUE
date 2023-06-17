<!--
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-16 19:13:46
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-16 20:25:25
 * @FilePath: \0202shangpinhui - test1\src\pages\Home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
      
        <!-- 三级导航 -->
        <TypeNav></TypeNav>
        <!-- 商品分类导航 -->
        <ListContainer></ListContainer>
        <!-- 今日推荐 -->
		<!-- <Recommend/> -->
		<!-- 商品排行 -->
		<!-- <Rank/> -->
		<!-- 喜欢 -->
		<!-- <Like/> -->
		<!-- 楼层 -->
		<Floor v-for = "(floor,index) in floorList" :key="floor.id" :floor = "floor" />
		
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
import { mapState } from 'vuex';


export default {
    name: "Home",
	
    components:{ListContainer,Recommend,Rank,Like,Floor,Brand},

	computed:{
		...mapState('home',['floorList'])
	},
	mounted(){
		this.$store.dispatch('home/getFloorList')
	},

};
</script>

<style lang="less" scoped>

</style>