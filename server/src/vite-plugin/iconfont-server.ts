import chalk from 'chalk'
import { getCssInfo, logTitle } from '../utils'
import { resolve } from 'node:path'
import type { PluginOption } from 'vite'

export const iconfontServer = async (options: {
  urlPrefix?: string,
  iconDir: string
}) => {
  const pluginOption: PluginOption = {
    name: 'iconfont-server',
    enforce: 'pre',
    apply: 'serve',
    configureServer(server) {
      const { urlPrefix = '/iconfont-proxy', iconDir = '' } = options

      logTitle()
      console.log(`  字体图标服务中间件已启动，${chalk.cyan(urlPrefix)}开头的请求将被代理到字体图标服务`)
      
      server.middlewares.use(async (req, res, next) => {
        const codeServiceReg = new RegExp(`^${urlPrefix}`)
        if (req.url && codeServiceReg.test(req.url)) {
          if (req.url === `${urlPrefix}/api/iconsInfo`) {
            const fontDir = resolve(process.cwd(), iconDir)

            const data = await getCssInfo(fontDir)

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              data,
              dir: options.iconDir || '',
              absDir: fontDir
            }))
          } else {
            res.statusCode = 404
            res.end(req.url)
          }
        } else {
          next()
        }
      })
    }
  }
  return pluginOption
}