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
  // rollup: {
  //   emitCJS: true
  // }
});
