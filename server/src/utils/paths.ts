import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** `/` */
export const projRoot = process.env.NODE_ENV === 'production' ? resolve(__dirname, '..') : resolve(__dirname, '..', '..', '..')

/** `/dist` */
export const buildOutput = process.env.NODE_ENV === 'production' ? projRoot : resolve(projRoot, 'dist')

/** `/dist/app` */
export const appOutput = resolve(buildOutput, 'app')

