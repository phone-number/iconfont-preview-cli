import { mkdir, rm } from 'fs/promises'
import { series, parallel } from 'gulp'
import { componentsOutput } from '@iconfont-cli/constants'
import {
  withTaskName,
  buildComponents,
  buildComponentsTypes,
  createPackageJson
} from './src'

export default series(
  withTaskName('clean components output', () => rm(componentsOutput, { recursive: true, force: true })),
  withTaskName('create components output', () => mkdir(componentsOutput, { recursive: true })),
  parallel(
    series(
      buildComponents,
      buildComponentsTypes
    ),
    createPackageJson
  )

)
