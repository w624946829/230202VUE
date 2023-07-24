const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //proxy代理服务器设置
  devServer: {
    proxy:{
      '/ghbk':{
        target:'https://www.ghxi.com',
        changeOrigin:true,
        pathRewrite: {'^/ghbk' : ''}
      },
      '/api':{
        target:'http://sph-h5-api.atguigu.cn',
        changeOrigin:true,
      },
    }
    
  },
})
