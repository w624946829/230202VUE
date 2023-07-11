/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}



// 代码一
//必需export 否则会导致路由找不到文件及main.ts产生错误
export {}
 
declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

// 代码二
/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }


// 代码三
  // <reference types="vite/client" />
// 解决引入vue的报错
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 解决引入scss报错问题
declare module "*.scss" {
  const scss: Record<string, string>;
  export default scss;
}

// 解决引入模块的报错提示
declare module "vuedraggable/src/vuedraggable";
declare module "@pureadmin/components";
declare module "@pureadmin/theme";
declare module "@pureadmin/theme/dist/browser-utils";
declare module "nprogress";
declare module "file-saver";
declare module "element-plus/dist/locale/zh-cn.mjs"; /*解决element-plus国际化依赖报错*/


/* 
  解决axios报错：类型“{ params: any; "": any; }”的参数不能赋给类型“AxiosRequestConfig<any>
  解决：属性“xxxxx”在类型”{ $: ComponentInternalInstance; $data : {}; $props:Part......报错问题
  */
declare module "axios" {
  export interface AxiosRequestConfig {
    // 添加数据类型
    handlerEnabled?: boolean;
    baseURL: string;
    timeout: number;
  }
}

// 处理TS数据类型问题  类型“AxiosResponse<any, any>”上不存在属性“meta”。
declare module "axios" {
  interface AxiosResponse<T = any> {
    meta: any;
    // 这里追加你的参数
    baseURL?: string;
    timeout?: number;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}