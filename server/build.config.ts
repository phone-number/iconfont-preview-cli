import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: "src",
      outDir: "../dist/server"
    }
  ],
  clean: true,
  declaration: true,
  // mkdist模式不支持cjs
  // rollup: {
  //   emitCJS: true
  // }
});
