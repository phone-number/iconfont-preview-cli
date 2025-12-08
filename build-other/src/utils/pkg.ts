import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import { projRoot } from '../utils'

/** 获取所有工作区间名称 */
export const getWorkspacePackages = () => findWorkspacePackages(projRoot)

/** npm包名 */
export const pkgName = 'iconfont-preview-cli'
