// token的key值
const TokenKey = 'vue_admin_template_token'
// 获取token
export function getToken() {
  return localStorage.getItem(TokenKey)
}
// 设置token
export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}
// 移除token
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
