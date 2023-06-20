/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-13 08:28:37
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-19 15:26:34
 * @FilePath: \day92\0202shangpinhui\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'

//完善
// function enhance(target,name){

// };


function enhance (target,name){
    // 第一步：保存原始的方法
    const origin = target.prototype[name]
    // 第二步：去修改
    target.prototype[name] = function(location,onSuccess,onError){
      if(onSuccess || onError){
        return origin.call(this,location,onSuccess,onError)
      }else {
        return origin.call(this,location).catch(()=>{})
      }
    }
  }
enhance(VueRouter,'push')
enhance(VueRouter,'replace')
Vue.use(VueRouter);

 export default new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(to,from){
        return {x:0,y:0}
    }
})

