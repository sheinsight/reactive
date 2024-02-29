import { describe, it, expect } from 'vitest'

import { ref, ProxyMap, ProxySet, create } from './index.js'

describe('index export', () => {
  it('[ref, ProxyMap, ProxySet, create] should be defined', () => {
    expect(ref).toBeDefined()
    expect(ProxyMap).toBeDefined()
    expect(ProxySet).toBeDefined()
    expect(create).toBeDefined()
  })
})
