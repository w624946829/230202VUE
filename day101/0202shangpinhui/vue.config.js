/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-12 08:33:38
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-12 10:55:36
 * @FilePath: \0202shangpinhui\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
