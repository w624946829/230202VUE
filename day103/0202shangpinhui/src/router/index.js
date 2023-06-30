/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-13 08:28:37
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-27 14:02:12
 * @FilePath: \day92\0202shangpinhui\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { getToken, deleteToken } from "@/utils/auth";
import store from "@/store";
import { Message } from "element-ui";

function enhance(target, name) {
  // 第一步：保存原始的方法
  const origin = target.prototype[name];
  // 第二步：去修改
  target.prototype[name] = function (location, onSuccess, onError) {
    if (onSuccess || onError) {
      return origin.call(this, location, onSuccess, onError);
    } else {
      return origin.call(this, location).catch(() => {});
    }
  };
}
enhance(VueRouter, "push");
enhance(VueRouter, "replace");
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
  //scrollBehavior何时调用？ - 项目一上来就调用，每次跳转的时候都调用
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
// 敏感路由名单
const authPath = ['/trade','/pay','/paysuccess','/order']
router.beforeEach(async (to, from, next) => {
  // 从localStorage中获取token
  const token = getToken();
  // 判断
  if (token) {
    console.log(
      "读取到token，所以是登录过的，接下来vuex中是否有相关信息"
    );
    // 从vuex中获取用户信息
    const { info } = store.state.user;
    // 判断vuex中是否有用户信息
    if (info.id) {
      console.log("拥有信息，访问无碍");
      next();
    } else {
      console.log("你拥有token但是你没有vuex中的相关信息，我去找到vuex中的服务员函数帮你进行申请");
      try {
        await store.dispatch("user/getUserInfo");
        console.log("根据你的token获取vuex中的信息成功，访问无碍");
        next();
      } catch (error) {
        console.log(
          "根据你的token获取vuex中的信息失败，删除不合法的token并且重定向到登录"
        );
        deleteToken();
        next("/login");
      }
    }
  } else {
    console.log(
      "因为你的token不存在，所以有些路由不能看，同时受到部分路由限制，进入下方相关判定"
    );
    if(authPath.includes(to.path)){
      Message.warning('请您先登录！')
      next('/login')
    }else{
      next()
    }
   
  }
});

export default router;
