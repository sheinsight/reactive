import { execSync } from 'node:child_process'
import { version } from '../package.json'

let command = 'pnpm -r publish --provenance --no-git-checks --access public'

if (version.includes('beta')) command += ' --tag beta'
if (version.includes('alpha')) command += ' --tag alpha'

execSync(command, { stdio: 'inherit' })
