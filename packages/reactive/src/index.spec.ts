import { describe, it, expect } from 'vitest'

import { ref, create } from './index.js'

describe('index export', () => {
  it('[ref, create] should be defined', () => {
    expect(ref).toBeDefined()
    expect(create).toBeDefined()
  })
})
