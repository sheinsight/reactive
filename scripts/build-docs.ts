import 'zx/globals'

const isSoDoc = process.env.PIPLINENAME === 'SODOC'

if (isSoDoc) {
  process.env.IS_SODOC = 'true'

  await $`pnpm add -Dw @alita/rspress-plugin@^1 @shein/rspress-plugin-sodoc@0.0.4`
}

await $`rspress build docs`
