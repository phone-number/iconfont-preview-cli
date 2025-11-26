// import { defineBuildConfig } from 'unbuild'

// export default defineBuildConfig({
//   entries: ['src/index'],
//   clean: true,
//   declaration: true,
//   rollup: {
//     emitCJS: true
//   }
// })

import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],        // 入口文件
  clean: true,                    // 打包前清空输出目录
  format: ['cjs', 'esm'],                // 输出 CommonJS（适合 Node.js）
  target: 'node18',               // 目标 Node.js 版本（根据你环境调整）
  sourcemap: true,                // 生成 sourcemap（可选）
  minify: false,                  // 通常服务器代码不压缩（可选）
  treeshake: true ,
  dts: true, 
  tsconfig: 'tsconfig.node.json'
});