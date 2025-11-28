import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  // node指令文件
  {
    entries: ['src/bin'],        // node指令文件
    outDir: '../dist/server',          // 输出目录
    clean: true,                    // 打包前清空输出目录
    rollup: {
      emitCJS: true
    }
  },
  // 导出模块
  {
    entries: ['src/index'],
    outDir: '../dist/server',
    clean: true,
    declaration: true,
    rollup: {
      emitCJS: true
    }
  }
]);