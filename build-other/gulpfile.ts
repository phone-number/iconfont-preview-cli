import { mkdir, rm } from 'fs/promises'
import { parallel, series } from 'gulp'
import { componentsOutput } from '@iconfont-cli/constants'
import {
  withTaskName
} from './src'

export default series(
  withTaskName('clean components output', () => rm(componentsOutput, { recursive: true, force: true })),
  withTaskName('create components output', () => mkdir(componentsOutput, { recursive: true })),
  // parallel(
  //   buildTheme,
  //   series(buildModules, buildTypesDefinitions),

  //   copyPublicFiles
  // )
)
