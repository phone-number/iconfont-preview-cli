import { mkdir, rm } from 'fs/promises'
import { series, parallel } from 'gulp'
import {
  withTaskName,
  buildComponents,
  buildComponentsTypes,
  createPackageJson,
  componentsOutput,
  copyPublic
} from './src'



export default series(
  withTaskName('clean components output', () => rm(componentsOutput, { recursive: true, force: true })),
  withTaskName('create components output', () => mkdir(componentsOutput, { recursive: true })),
  parallel(
    series(
      buildComponents,
      buildComponentsTypes
    ),
    createPackageJson,
    copyPublic
  )
)
