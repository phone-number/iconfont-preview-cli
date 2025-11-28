import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
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
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver()
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css'
        })
      ]
    })
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      // 代理api请求接口
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      // 代理字体图标css
      '/dev': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: p => p.replace('/dev', ''),
      }
    }
  }

})
