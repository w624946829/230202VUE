const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 设置看门人
    proxy: {
      // /api相当于是标识,只要发的请求带着 /api,那么这个看门人都认识
      "/api": {
        // 然后这个看门给进行转发,转发到target的地址
        target: "http://localhost:3000",
        // 在转发的过程中,把/api替换成空字符串
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
})
