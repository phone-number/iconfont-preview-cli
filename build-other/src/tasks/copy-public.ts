import { parallel } from "gulp"
import {  withTaskName, buildOutput, projRoot } from "../utils"
import { resolve } from 'node:path'
import { copy } from 'fs-extra'
const copyPublicHandler = async () => {
  await copy(resolve(projRoot, 'LICENSE'), resolve(buildOutput, 'LICENSE'))
  await copy(resolve(projRoot, 'README.md'), resolve(buildOutput, 'README.md'))
}

export const copyPublic = parallel(
  withTaskName('copy public', copyPublicHandler)
)