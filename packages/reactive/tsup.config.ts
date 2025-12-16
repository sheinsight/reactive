import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es5',
  /** @issue https://github.com/egoist/tsup/issues/1000 */
  entry: [
    'src/index.ts',
    'src/vanilla/index.ts', // export `./vanilla` entry in `package.json`
    'src/standalone/create-single-loading', // export `./extras/create-single-loading` entry in `package.json`
  ],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
})
