import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** `/` 运行时根目录 */
export const runtimeProjRoot = process.env.NODE_ENV === 'dev' ? resolve(__dirname, '..', '..', '..') : resolve(__dirname, '..') 
/** `/` */
export const projRoot = resolve(__dirname, '..', '..', '..')

/** `/dist` 运行时 */
export const buildOutput = process.env.NODE_ENV === 'dev' ? resolve(runtimeProjRoot, 'dist') : runtimeProjRoot 

/** `/dist/app` 运行时 */
export const appOutput = resolve(buildOutput, 'app')


