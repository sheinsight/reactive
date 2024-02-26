import { describe, it, expect } from 'vitest'

import { ref, ProxyMap, ProxySet, create, produce, proxy, subscribe, getSnapshot } from './index.js'

describe('index export', () => {
  it('[ref, ProxyMap, ProxySet, create, produce, proxy, subscribe, getSnapshot] should be defined', () => {
    expect(ref).toBeDefined()
    expect(ProxyMap).toBeDefined()
    expect(ProxySet).toBeDefined()
    expect(create).toBeDefined()
    expect(produce).toBeDefined()
    expect(proxy).toBeDefined()
    expect(subscribe).toBeDefined()
    expect(getSnapshot).toBeDefined()
  })
})
