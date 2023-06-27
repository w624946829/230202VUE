<template>
  <div>
    <div class="page-header col-xs-offset-2 col-xs-8">
			<router-link to="/">
				<img class="img" src="https://ftp.bmp.ovh/imgs/2021/12/a6ca21adc5f83d1e.webp" alt="">
			</router-link>
			<h2>【网络一线牵，珍惜这段缘】—— 测试导航守卫</h2>
		</div>
    <!-- 导航区域 -->
    <div class="col-xs-2 col-xs-offset-2">

      <router-link class="list-group-item" active-class="active" to="/home">
				<span class="iconfont icon-zhuye"></span> 主页（Home）
			</router-link>

      <router-link class="list-group-item" active-class="active" to="/hot">
				<span class="iconfont icon-remen"></span> 热门（Hot）
			</router-link>

      <router-link class="list-group-item" active-class="active" to="/like">
				<span class="iconfont icon-xindong"></span> 喜欢（Like）
			</router-link>

      <router-link class="list-group-item" active-class="active" to="/near">
				<span class="iconfont icon-fujin"></span> 附近（Near）
			</router-link>
    </div>
    <!-- 展示区 -->
    <div class="col-xs-6 panel-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
	export default {
		name: "App",
	};
</script>

<style>
	.page-header{
		display: flex;
	}
	.img{
		width: 100px;
	}
</style>