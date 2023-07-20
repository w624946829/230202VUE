/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 处理TS数据类型问题  类型“AxiosResponse<any, any>”上不存在属性“meta”。
// declare module "axios" {
//   interface AxiosResponse<T = any> {
//     meta: any;
//     // 这里追加你的参数
//     baseURL?: string;
//     timeout?: number;
//   }
//   export function create(config?: AxiosRequestConfig): AxiosInstance;
// }