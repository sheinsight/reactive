import { $ } from 'execa'
import { findPackages } from 'find-packages'
import { readPackage, type NormalizedPackageJson } from 'read-pkg'
import { writePackage } from 'write-package'
import path from 'node:path'
import process from 'node:process'
import readYamlFile from 'read-yaml-file'

const gitTag = process.env.GITHUB_REF_NAME

if (!gitTag) {
  console.error(
    'This script is intended to be run in GitHub Action. If you want to release packages, please run `pnpm bump`.'
  )

  process.exit(1)
}

const getUpdatedPackageJson = (
  json: NormalizedPackageJson,
  v: string
): Record<string, string | boolean | number> => {
  const pkgJson: Record<string, string | boolean | number> = { ...json }

  delete pkgJson._id
  delete pkgJson.readme

  pkgJson.version = v

  return pkgJson
}

function extractVersionTag(version: string): string {
  const match = /^v?\d+\.\d+\.\d+(-([\w]+))?(\d*\.*[\w]+)?$/i.exec(version)
  return match && match[2] ? match[2] : 'latest'
}

const npmTag = extractVersionTag(gitTag)

if (npmTag === 'snapshot') {
  const yaml = await readYamlFile<{ packages: string[] }>(
    path.join(process.cwd(), 'pnpm-workspace.yaml')
  )

  const packagesMeta = await findPackages(process.cwd(), {
    patterns: yaml.packages,
  })

  for (const iterator of packagesMeta) {
    const json = await readPackage({ cwd: iterator.dir })
    const updatedJson = getUpdatedPackageJson(json, 'snapshot')
    await writePackage(path.join(iterator.dir, 'package.json'), updatedJson)
  }
}

try {
  const res = await $`pnpm -r publish --no-git-checks --tag ${npmTag}`
    .pipeStderr?.(process.stderr)
    .pipeStdout?.(process.stdout)

  res?.stderr && console.log(res?.stderr)
} catch (error) {
  console.error(error)
  process.exit(1)
}
