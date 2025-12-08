import chalk from "chalk"
import { getVersion } from "./version"

export const logTitle = (start?: number) => {
  const readyIn = start ? `  ${chalk.gray('ready in')} ${chalk.bold(Date.now() - start)} ms` : ''
  console.log(`\n  ${chalk.green.bold('iconfont-preview-cli')} ${chalk.green(getVersion())}${readyIn} \n`)
}