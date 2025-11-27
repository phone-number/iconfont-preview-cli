import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],        // 入口文件
  outDir: '../dist/server',          // 输出目录
  clean: true,                    // 打包前清空输出目录
  format: ['cjs', 'esm'],                // 输出 CommonJS（适合 Node.js）
  target: 'node18',               // 目标 Node.js 版本（根据你环境调整）
  sourcemap: true,                // 生成 sourcemap（可选）
  minify: false,                  // 通常服务器代码不压缩（可选）
  treeshake: true,
  env: {
    NODE_ENV: 'production',
  },
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  esbuildOptions(options) {
    // 禁用代码分割（仅适用于没有动态 import 的场景）
    options.splitting = false;
    options.chunkNames = undefined;
  },
});