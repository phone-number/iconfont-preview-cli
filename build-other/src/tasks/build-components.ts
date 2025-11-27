import { series } from 'gulp'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { withTaskName, componentsInput, componentsOutput } from '../utils'
import { resolve } from 'node:path'

const buildComponentsHand = async () => {
  await build({
    resolve: {
      alias: [
        {
          find: '/@',
          replacement: resolve(componentsInput, '../')
        }
      ]
    },
    build: {
      emptyOutDir: true,
      outDir: componentsOutput,
      lib: {
        entry: componentsInput,
        fileName: (format) => format === 'es' ? 'index.mjs' : 'index.cjs',
        formats: ['es', 'cjs']
      },
      rollupOptions: {
        // 确保 Vue 被作为外部依赖（不打包进库）
        external: ['vue'],
        output: {
          // 将 SCSS 也打包为独立文件
          assetFileNames: (assetInfo) => {
            return 'index.css'
          }
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver()
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'css'
          })
        ],
      })
    ],
  })
}

export const buildComponents = series(
  withTaskName('build components', buildComponentsHand)
)