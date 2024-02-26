import { describe, it, expect } from 'vitest'

import { hasRef, ref } from './ref.js'

describe('ref', () => {
  it('should return the same object', () => {
    const obj = { a: 1 }
    const refObj = ref(obj)

    expect(refObj).toBe(obj)
  })

  it('should has ref', () => {
    const obj = { a: 1 }
    const refObj = ref(obj)
    expect(hasRef(refObj)).toBe(true)
  })

  it('should not be ref', () => {
    expect(hasRef({})).toBe(false)
  })
})
