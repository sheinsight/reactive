import { describe, expect, it } from 'vitest'
import { isRef, ref, deepCloneWithRef } from './ref.js'

describe('ref', () => {
  it('should return the same object', () => {
    const obj = { a: 1 }
    const refObj = ref(obj)

    expect(refObj).toBe(obj)
  })

  it('should has ref', () => {
    const obj = { a: 1 }
    const refObj = ref(obj)
    expect(isRef(refObj)).toBe(true)
  })

  it('should not be ref', () => {
    expect(isRef({})).toBe(false)
  })
})

describe('deepCloneWithRef', () => {
  it('should deep clone an object without refs', () => {
    const obj = { a: 1, b: { c: 2 } }
    const clonedObj = deepCloneWithRef(obj)

    expect(clonedObj).toEqual(obj)
    expect(clonedObj).not.toBe(obj)
    expect(clonedObj.b).not.toBe(obj.b)
  })

  it('should deep clone an object with refs', () => {
    const obj = { a: 1, b: ref({ c: 2 }) }
    const clonedObj = deepCloneWithRef(obj)

    expect(clonedObj).toEqual(obj)
    expect(clonedObj).not.toBe(obj)
    expect(clonedObj.b).toBe(obj.b)
  })

  it('should handle nested refs correctly', () => {
    const nestedRef = ref({ c: 2 })
    const obj = { a: 1, b: { d: nestedRef } }
    const clonedObj = deepCloneWithRef(obj)

    expect(clonedObj).toEqual(obj)
    expect(clonedObj).not.toBe(obj)
    expect(clonedObj.b.d).toBe(nestedRef)
  })
})
