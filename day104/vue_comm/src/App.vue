<template>
	<div class="container-fluid wraper">
		<h1 class="title">
			Vue组件间通信总结(10种)<span class="high">非常重要, 面试必备</span>
		</h1>
		<hr>
		<div class="row">
			<div class="col-xs-3 col-md-3 col-lg-3 col-xl-3">
				<!-- 导航区 -->
				<router-link active-class="active" class="list-group-item" to="/props">1. props</router-link>
				<router-link active-class="active" class="list-group-item" to="/event">2. 自定义事件</router-link>
				<router-link active-class="active" class="list-group-item" to="/bus">3. 事件总线</router-link>
				<router-link active-class="active" class="list-group-item" to="/model">4. v-model</router-link>
				<router-link active-class="active" class="list-group-item" to="/sync">5. sync</router-link>
				<router-link active-class="active" class="list-group-item" to="/attrs-listeners">6. $attrs 与 $listeners</router-link>
				<router-link active-class="active" class="list-group-item" to="/ref-children-parent">7. <span class="small">$refs、$children、$parent</span></router-link>
				<router-link active-class="active" class="list-group-item" to="/provide-inject">8. provide / inject</router-link>
				<router-link active-class="active" class="list-group-item" to="/vuex">9. vuex</router-link>
				<router-link active-class="active" class="list-group-item" to="/slot">10. slot</router-link>
			</div>
			<div class="col-xs-9 col-md-9 col-lg-9 col-xl-9">
				<div class="panel-body">
					<!-- 占位一个展示区 -->
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'App',
	}
</script>

<style lang="less" scoped>
	.wraper {
		.title {
			padding: 20px;
			text-align: center;
		}
		.small{
			font-size: 15px;
		}
	}
</style>