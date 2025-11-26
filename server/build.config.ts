import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index"
  ],
  outDir: '../dist/server',
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true
  }
});
