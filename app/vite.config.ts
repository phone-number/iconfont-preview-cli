import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ElementPlus from 'unplugin-element-plus/vite'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const pathResolve = (directory: string) => {
  return path.resolve(dirname, '.', directory)
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: pathResolve('../dist/app')
  },
  resolve: {
    alias: [
      {
        find: '/@',
        replacement: pathResolve('./src/')
      }
    ]
  },
  plugins: [
    vue(),
    vueJsx(),
    ElementPlus({})
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      // 代理api请求接口
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      },
      // 代理字体图标css
      '/dev': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: p => p.replace('/dev', ''),
      }
    }
  }

})
