import { parallel } from "gulp"
import { run, withTaskName, buildOutput, componentsOutput, projRoot } from "../utils"
import { resolve } from 'node:path'
import { copy, remove } from 'fs-extra'

const typesDir = resolve(buildOutput, 'types', 'app/src/components')
const autoImportType = resolve(projRoot, 'build-other/auto-imports.d.ts')


const cleanComponentsTypes = async () => {
  await remove(resolve(buildOutput, 'types'))
  await remove(resolve(buildOutput, 'tsconfig.components.tsbuildinfo'))
  await remove(autoImportType)
}
const buildComponentsTypesHand = async () => {
  await run(
    'npx vue-tsc -p tsconfig.components.json --declaration --emitDeclarationOnly --declarationDir dist/types'
  )
  await copy(typesDir, resolve(componentsOutput, 'types'))
  await copy(autoImportType, resolve(componentsOutput, 'types/global.d.ts'))

  await cleanComponentsTypes()
}


export const buildComponentsTypes = parallel(
  withTaskName('build components types', buildComponentsTypesHand),
)