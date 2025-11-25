import { parallel } from "gulp"
import { run, withTaskName } from "../utils"
import { resolve } from 'node:path'
import { buildOutput, componentsOutput } from '@iconfont-cli/constants'
import { copy, remove } from 'fs-extra'

const typesDir = resolve(buildOutput, 'types', 'app/src/components')


const cleanComponentsTypes = async () => {
  await remove(resolve(buildOutput, 'types'))
  await remove(resolve(buildOutput, 'tsconfig.components.tsbuildinfo'))
}
const buildComponentsTypesHand = async () => {
  await run(
    'npx vue-tsc -p tsconfig.components.json --declaration --emitDeclarationOnly --declarationDir dist/types'
  )
  await copy(typesDir, resolve(componentsOutput, 'types'))
  await cleanComponentsTypes()
}


export const buildComponentsTypes = parallel(
  withTaskName('build components types', buildComponentsTypesHand),
)