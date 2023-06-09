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
