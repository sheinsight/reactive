import { describe, expect, it } from 'vitest'

import { produce } from './produce.js'

describe('produce', () => {
  it('produce should be a function', () => {
    expect(typeof produce).toBe('function')
  })

  it('should produce a new object with a new array', () => {
    const obj = { a: [1, 2, 3] }
    const newObj = produce(obj, (draft) => {
      draft.a.push(4)
    })

    expect(newObj).not.toBe(obj)
    expect(newObj.a).not.toBe(obj.a)
    expect(newObj).toMatchInlineSnapshot(`
      {
        "a": [
          1,
          2,
          3,
          4,
        ],
      }
    `)
  })

  it('should produce a new array with a new object', () => {
    const arr = [{ a: 1 }]
    const newArr = produce(arr, (draft) => {
      draft[0].a = 2
    })

    expect(newArr).not.toBe(arr)
    expect(newArr[0]).not.toBe(arr[0])
    expect(newArr).toMatchInlineSnapshot(`
      [
        {
          "a": 2,
        },
      ]
    `)
  })

  it('should produce a new object with a new array with a new object', () => {
    const obj = { a: [{ b: 1 }] }
    const newObj = produce(obj, (draft) => {
      draft.a[0].b = 2
    })

    expect(newObj).not.toBe(obj)
    expect(newObj.a).not.toBe(obj.a)
    expect(newObj.a[0]).not.toBe(obj.a[0])
    expect(newObj).toMatchInlineSnapshot(`
      {
        "a": [
          {
            "b": 2,
          },
        ],
      }
    `)
  })
})
