import { describe, it, expect } from 'vitest'

import { createWithHooks, useSnapshot } from './index.js'

describe('react index export', () => {
  it('[createWithHooks, useSnapshot] should be defined', () => {
    expect(useSnapshot).toBeDefined()
    expect(createWithHooks).toBeDefined()
  })
})
