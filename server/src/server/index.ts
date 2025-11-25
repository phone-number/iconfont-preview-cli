import Koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'
import chalk from 'chalk'
import { resolve } from 'node:path'
import { appOutput } from '@iconfont-cli/constants'
import { extractClassNames, readCssFilesAsync } from '../utils/css'
import { findAvailablePort } from '../utils/port'

export const fontServer = async (options: { port: number | string, dir: string }) => {
  const start = Date.now()

  const fontDir = resolve(process.cwd(), options.dir || '')

  const app = new Koa()
  const router = new Router()
  app.use(router.routes())

  // 将字体图标文件夹配置成静态文件服务
  app.use(serve(fontDir))
  // 将前端项目设置静态文件服务
  app.use(serve(appOutput));

  router.get('/api/iconsInfo', async context => {
    const filePaths = await readCssFilesAsync(fontDir)

    const data: Array<NonNullable<Awaited<ReturnType<typeof extractClassNames>>>> = []
    await Promise.all(filePaths.map(async filePath => {
      const res = await extractClassNames(filePath, fontDir)
      res && data.push(res)
    }))
    context.type = 'application/json'
    context.body = {
      data
    }
  })

  const port = await findAvailablePort(Number(options.port))

  app.listen(port, () => {
    console.log(`\n  ${chalk.green.bold('iconfont-cli')}  ${chalk.gray('ready in')} ${chalk.bold(Date.now() - start)} ms \n`)
    console.log(`  ${chalk.green('→')}  Local:   ${chalk.blue(`http://127.0.0.1:${port}`)}`)
  })
}

