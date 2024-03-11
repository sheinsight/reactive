import { describe, it, expect } from 'vitest'

import { ref, create, produce, proxy, subscribe, getSnapshot } from './index.js'

describe('vanilla index export', () => {
  it('[ref, create, produce, proxy, subscribe, getSnapshot] should be defined', () => {
    expect(ref).toBeDefined()
    expect(create).toBeDefined()
    expect(produce).toBeDefined()
    expect(proxy).toBeDefined()
    expect(subscribe).toBeDefined()
    expect(getSnapshot).toBeDefined()
  })
})
