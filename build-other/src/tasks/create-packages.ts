import { parallel } from "gulp";
import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'fs-extra'
import { withTaskName } from "../utils";
import { buildOutput, projRoot } from '@iconfont-cli/constants'

const packageJsonSourcePath = resolve(projRoot, 'package.json')
const packageJsonTargetPath = resolve(buildOutput, 'package.json')

/**
 * 处理指定的字段。
 * @param data 包含要处理的字段的对象。
 * @param fieldName 要处理的字段名。
 * @param transformFunction 用于处理字段值的函数。
 * @example processField(data, 'name', transformFunction)
 */
export const processField = (
  data: { [key: string]: any },
  fieldName: string,
  transformFunction: (value: string) => string
) => {
  const pendingValue = data[fieldName]
  if (typeof pendingValue === 'string') {
    data[fieldName] = transformFunction(pendingValue)
  } else if (typeof pendingValue === 'object') {
    Object.keys(pendingValue).forEach(key => {
      processField(pendingValue, key, transformFunction)
    })
  }
}


const createPackageJsonHand = async () => {
  const packageJsonContent = readFileSync(packageJsonSourcePath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent)

  // 删除 scripts 字段
  delete packageJson.scripts
  // 处理 exports 和 bin 字段
  processField(packageJson, 'exports', value => value.replace('/dist', ''))
  processField(packageJson, 'bin', value => value.replace('/dist', ''))
  // 处理node兼容
  processField(packageJson.engines, 'node', () => ">=18")



  writeFileSync(packageJsonTargetPath, JSON.stringify(packageJson, null, 2))
}

export const createPackageJson = parallel(
  withTaskName('create packages.json', createPackageJsonHand),
)