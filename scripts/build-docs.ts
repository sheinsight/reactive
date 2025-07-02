import 'zx/globals'

const isSoDoc = process.env.PIPLINENAME === 'SODOC'

if (isSoDoc) {
  process.env.IS_SODOC = 'true'

  await $`pnpm add -Dw @alita/rspress-plugin @shein/rspress-plugin-sodoc`
}

await $`rspress build docs`
