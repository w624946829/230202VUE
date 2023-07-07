import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // host: '0.0.0.0',
    // port: 3002,
    // open: true, // 自动打开浏览器
    proxy: {
      '/app-dev': {
        target: 'http://139.198.104.58:8209', // 这个不行
        changeOrigin: true,
        // 重写路径: 去掉路径中开头的'/dev-api'
        rewrite: (path) => path.replace(/^\/app-dev/, '')
      }
    }
  }
})