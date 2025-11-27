import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** `/` */
export const projRoot = resolve(__dirname, '..', '..', '..')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')

/** `/app/src/components` */
export const componentsInput = resolve(projRoot, 'app/src/components')
/** `/dist/components` */
export const componentsOutput = resolve(buildOutput, 'components')
