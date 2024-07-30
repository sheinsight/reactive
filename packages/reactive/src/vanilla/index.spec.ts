import { describe, expect, it } from 'vitest'

import { create, getSnapshot, produce, proxy, ref, subscribe } from './index.js'

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
