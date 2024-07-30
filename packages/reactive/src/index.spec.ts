import { describe, expect, it } from 'vitest'

import { create, ref } from './index.js'

describe('index export', () => {
  it('[ref, create] should be defined', () => {
    expect(ref).toBeDefined()
    expect(create).toBeDefined()
  })
})
