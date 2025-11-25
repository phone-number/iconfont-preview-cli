import { program } from 'commander'
import { fontServer } from './server'

program
  // .command('serve')
  .option('-p, --port <port>', '服务端口', '3000')
  .option('-d, --dir <dir>', '字体图标文件夹路径')
  .action(fontServer)


program.parse(process.argv)