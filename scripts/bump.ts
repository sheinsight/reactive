import { $ } from 'execa'
import { findPackages } from 'find-packages'
import { readPackage } from 'read-pkg'
import { writePackage } from 'write-package'
import enquirer from 'enquirer'
import path from 'node:path'
import readYamlFile from 'read-yaml-file'
import semver from 'semver'

const packageJson = await readPackage()

const res = await $`git rev-parse --short HEAD`

const choices = (
  ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease', 'snapshot'] as const
).map((type) => {
  if (type === 'snapshot') {
    const next = `0.0.0-snapshot.${res.stdout}`
    return {
      name: next,
      message: 'snapshot',
      hint: next,
      value: next,
    }
  }
  const value = semver.inc(packageJson.version, type, 'alpha')!
  return {
    name: value,
    message: type,
    hint: value,
    value: value,
  }
})

const { v } = await enquirer.prompt<{ v: string }>({
  type: 'select',
  name: 'v',
  message: 'What type of release?',
  choices: choices,
})

const { isSure } = await enquirer.prompt<{ isSure: boolean }>({
  type: 'confirm',
  initial: false,
  name: 'isSure',
  message: `Are you sure to release? [ ${v} ]`,
})

if (isSure) {
  if (!v.includes('snapshot')) {
    packageJson.version = v
    await writePackage(packageJson)
    const yaml = await readYamlFile<{ packages: string[] }>(
      path.join(process.cwd(), 'pnpm-workspace.yaml')
    )
    const packagesMeta = await findPackages(process.cwd(), {
      patterns: yaml.packages,
    })
    for (const iterator of packagesMeta) {
      const json = await readPackage({ cwd: iterator.dir })
      json.version = v

      const pkgJson: Record<string, string | boolean | number> = { ...json }

      delete pkgJson._id
      delete pkgJson.readme

      await writePackage(path.join(iterator.dir, 'package.json'), pkgJson)
    }
    await $`git add .`
    await $`git commit -m ${v}`
  }
  await $`git tag v${v}`
}
