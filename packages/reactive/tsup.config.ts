import { defineConfig } from "tsup";

export default defineConfig({
  target: "es5",
  // for exported `./utils` entry in `package.json`
  entry: ["src/index.ts", "src/utils.ts"],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: "esm",
});
