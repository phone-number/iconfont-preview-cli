import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** `/` */
export const projRoot = resolve(__dirname, '..', '..')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')

/** `/dist/app` */
export const appOutput = resolve(buildOutput, 'app')

/** `/dist/serve` */
export const serverOutput = resolve(buildOutput, 'server')

/** `/app/src/components` */
export const componentsInput = resolve(projRoot, 'app/src/components')
/** `/dist/components` */
export const componentsOutput = resolve(buildOutput, 'components')

/** `/app/src/theme-chalk` */
export const themeChalkInput = resolve(projRoot, 'app/src/theme-chalk')
/** `/dist/theme-chalk` */
export const themeChalkOutput = resolve(buildOutput, 'theme-chalk')
