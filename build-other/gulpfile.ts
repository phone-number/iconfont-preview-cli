import { mkdir, rm } from 'fs/promises'
import { series } from 'gulp'
import { componentsOutput } from '@iconfont-cli/constants'
import {
  withTaskName,
  buildComponents,
  buildComponentsTypes
} from './src'

export default series(
  withTaskName('clean components output', () => rm(componentsOutput, { recursive: true, force: true })),
  withTaskName('create components output', () => mkdir(componentsOutput, { recursive: true })),
  buildComponents,
  buildComponentsTypes
)
