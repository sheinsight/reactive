import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/proxy.ts",
    "src/utils.ts",
    "src/subscribe.ts",
    "src/use-snapshot.ts",
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: "esm",
});
