import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { projRoot } from "./paths"

export const getVersion = () => {
  const packageJsonContent = readFileSync(resolve(projRoot, "package.json"), 'utf8')
  const packageJson = JSON.parse(packageJsonContent)
  const { version = '' } = packageJson
  return version ? `v${version}` : version
}