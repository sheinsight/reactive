import { describe, expect, it, vitest } from 'vitest'

import { LISTENERS } from '../utils/index.js'
import { subscribe } from './subscribe.js'

describe('subscribe', () => {
  it('should add a listener to proxyObject', () => {
    const proxyObject = { [LISTENERS]: new Set() } as any
    const callback = vitest.fn()

    const unsubscribe = subscribe(proxyObject, callback)
    expect(proxyObject[LISTENERS].size).toBe(1)

    unsubscribe()
    expect(proxyObject[LISTENERS].size).toBe(0)
  })
})
