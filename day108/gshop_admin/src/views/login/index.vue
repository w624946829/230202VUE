<template>
  <div class="login-container">
    <el-form ref="formRef" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">尚品汇后台管理</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="ele-UserFilled" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="ele-Lock" />
        </span>
        <el-input :key="passwordType" ref="passwordRef" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'ele-Hide' : 'ele-View'" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;height: 40px;" @click.native.prevent="handleLogin">登 陆</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Login'
}
</script>

<script lang="ts" setup>
import { useUserInfoStore } from '@/stores/userInfo'
import type { FormInstance } from 'element-plus'
import { nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 获取路由器对象
const userInfoStore = useUserInfoStore()
const route = useRoute()
const router = useRouter()
// 使用ref的方式定义一个影影视的对象数据，用来手机账号和密码
const loginForm = ref({
  username: 'admin',
  password: '111111'
})
// 加载的效果标识
const loading = ref(false)
// 用来控制密码框是明文还是密文的标识
const passwordType = ref('password')
// 用来存储路由在跳转的时候是否有新的路由地址
const redirect = ref('')
// 用来获取密码框DOM对象的
const passwordRef = ref<HTMLInputElement>()
// 用来获取el-from组件对象的
const formRef = ref<FormInstance>()
// 用来验证账号的规则的定义
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.length < 4) {
    callback(new Error('用户名长度不能小于4位'))
  } else {
    callback()
  }
}
// 用来验证密码的规则的定义
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    callback()
  }
}

const loginRules = {
  username: [{ required: true, validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}

watch(
  route,
  () => {
    redirect.value = route.query && (route.query.redirect as string)
  },
  { immediate: true }
)

/* 
切换密码的显示/隐藏
*/
const showPwd = () => {
  // 判断当前文本框的类型是不是password，如果是就改成文本框， 密码是明文显示的
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {//不是password，也就是说现在的文本框数据普通的文本显示，此时密码是明文显示，就改成秘闻显示
    passwordType.value = 'password'
  }
  // dom更新后，设置密码框自动更新焦点
  nextTick(() => {
    passwordRef.value?.focus()
  })
}

/* 
点击登陆的回调
*/


const handleLogin = async () => {
  // 如果表单验证全都通过，结果就是true，否则为false
  await formRef.value?.validate()
  // 所有的表单验证都通过了
  loading.value = true//设置加载的效果要显示出来
  // 获取账号和密码
  const { username, password } = loginForm.value
  try {
    // 分发pinia中用户信息模块仓库中的登录的actiuon，内部调用登录的相关接口，传入账号和Miami
    await userInfoStore.login(username, password)
    // 登陆成功后，进行路由跳转，有可能跳转到首页，也有可能跳转到其他页面
    router.push({ path: redirect.value || '/' })
  } finally {
    // 登录失败，加载效果消失
    loading.value = false
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  background-image: url(../../assets/bg.jpg);
  background-color: #2d3a4b;
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .el-input__wrapper {
      width: 100%;
      background-color: transparent;
      box-shadow: none;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
