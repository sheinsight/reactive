import path from 'node:path'
import enquirer from 'enquirer'
import { $ } from 'execa'
import { findPackages } from 'find-packages'
import { type NormalizedPackageJson, readPackage } from 'read-pkg'
import readYamlFile from 'read-yaml-file'
import semver from 'semver'
import { writePackage } from 'write-package'

const packageJson = await readPackage()

const res = await $`git rev-parse --short HEAD`

const versionType = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease', 'snapshot'] as const

const choices = versionType.map((type) => {
  const isSnapshot = type === 'snapshot'

  const next = isSnapshot ? `0.0.0-snapshot.${res.stdout}` : semver.inc(packageJson.version, type, 'alpha')

  if (!next) throw new Error(`Invalid version: ${next}`)

  return {
    name: next,
    message: type,
    hint: next,
    value: next,
  }
})

const { v } = await enquirer.prompt<{ v: string }>({
  type: 'select',
  name: 'v',
  message: 'What type of version do you want to release?',
  choices: choices,
})

const { isSure } = await enquirer.prompt<{ isSure: boolean }>({
  type: 'confirm',
  initial: false,
  name: 'isSure',
  message: `Are you sure you want to release v${v}?`,
})

if (!isSure) process.exit(0)

const isSnapshot = v.includes('snapshot')

const getUpdatedPackageJson = (json: NormalizedPackageJson, v: string): Record<string, string | boolean | number> => {
  const pkgJson: Record<string, string | boolean | number> = { ...json }

  delete pkgJson._id
  delete pkgJson.readme

  pkgJson.version = v

  return pkgJson
}

if (!isSnapshot) {
  await writePackage(getUpdatedPackageJson(packageJson, v))
  const yamlPath = path.join(process.cwd(), 'pnpm-workspace.yaml')
  const { packages = [] } = await readYamlFile<{ packages: string[] }>(yamlPath)
  const packagesMeta = await findPackages(process.cwd(), { patterns: packages })

  for (const iterator of packagesMeta) {
    const json = await readPackage({ cwd: iterator.dir })
    await writePackage(path.join(iterator.dir, 'package.json'), getUpdatedPackageJson(json, v))
  }

  await $`git add . -A`
  await $`git commit -m ${`chore: release v${v}`}`
}

await $`git tag v${v}`
