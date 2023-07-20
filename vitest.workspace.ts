import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/*',
  {
    test: {
      include: ['packages/**/use-*.spec.ts'],
      environment: 'happy-dom'
    }
  }
])
