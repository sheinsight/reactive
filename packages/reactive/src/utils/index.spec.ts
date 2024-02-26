import { describe, it, expect } from 'vitest'

import {
  isObject,
  canProxy,
  createObjectFromPrototype,
  SNAPSHOT,
  LISTENERS,
  REACTIVE,
  propertyKeysToPath,
  get,
  shallowEqual,
} from './index.js'

describe('Object Utils', () => {
  describe('isObject', () => {
    it('should return true for object', () => {
      expect(isObject({})).toBe(true)
    })

    it('should return false for null', () => {
      expect(isObject(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isObject(undefined)).toBe(false)
    })

    it('should return false for string', () => {
      expect(isObject('a string')).toBe(false)
    })

    it('should return false for number', () => {
      expect(isObject(100)).toBe(false)
    })
  })

  describe('canProxy', () => {
    it('should return true for plain object', () => {
      expect(canProxy({})).toBe(true)
    })

    it('should return true for array', () => {
      expect(canProxy([])).toBe(true)
    })

    it('should return false for symbol', () => {
      expect(canProxy(Symbol.iterator)).toBe(false)
    })

    it('should return false for object with Symbol.iterator defined', () => {
      expect(canProxy({ [Symbol.iterator]: () => {} })).toBe(false)
    })

    it('should return false for instance of WeakMap, WeakSet, Error, Number, Date, String, RegExp, ArrayBuffer', () => {
      expect(canProxy(new WeakMap())).toBe(false)
      expect(canProxy(new WeakSet())).toBe(false)
      expect(canProxy(new Error())).toBe(false)
      expect(canProxy(new Number())).toBe(false)
      expect(canProxy(new Date())).toBe(false)
      expect(canProxy(new String())).toBe(false)
      expect(canProxy(new RegExp(''))).toBe(false)
      expect(canProxy(new ArrayBuffer(2))).toBe(false)
    })
  })

  describe('createObjectFromPrototype', () => {
    it('should create new array for array prototype', () => {
      const newArray = createObjectFromPrototype([1, 2, 3])
      expect(Array.isArray(newArray)).toBe(true)
    })

    it('should create new object for object prototype', () => {
      const newObject = createObjectFromPrototype({})
      expect(typeof newObject).toBe('object')
    })
  })

  describe('Symbols: SNAPSHOT, LISTENERS, REACTIVE', () => {
    it('should be defined', () => {
      expect(SNAPSHOT).toBeDefined()
      expect(LISTENERS).toBeDefined()
      expect(REACTIVE).toBeDefined()
    })
  })

  describe('propertyKeysToPath', () => {
    it('should convert property keys to path', () => {
      const path = propertyKeysToPath(['a', 'b', 0, 'c'])
      expect(path).toBe('a.b[0].c')
    })

    it('should convert property keys to path', () => {
      const path = propertyKeysToPath(['a', 'b', 'c'])
      expect(path).toBe('a.b.c')
    })

    it('should convert property keys to path', () => {
      const path = propertyKeysToPath(['a', 0, 'c'])
      expect(path).toBe('a[0].c')
    })

    it('should convert property keys to path', () => {
      const path = propertyKeysToPath(['a', 'b', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      expect(path).toBe('a.b[0][1][2][3][4][5][6][7][8][9][10]')
    })
  })

  describe('get', () => {
    it('should get value from object', () => {
      const value = get([1], 0)
      expect(value).toBe(1)
    })

    it('should get value from object', () => {
      const value = get([1], '0')
      expect(value).toBe(1)
    })

    it('should get value from object', () => {
      const value = get({ a: 1 }, 'a')
      expect(value).toBe(1)
    })

    it('should get value from object', () => {
      const value = get({ a: { b: { c: 1 } } }, ['a', 'b', 'c'])
      expect(value).toBe(1)
    })

    it('should get value from object', () => {
      const value = get([{ a: { b: { c: 1 } } }], [0, 'a', 'b', 'c'])
      expect(value).toBe(1)
    })

    it('should get value from object', () => {
      const value = get({ a: { b: [{ c: 1 }] } }, ['a', 'b', 0, 'c'])
      expect(value).toBe(1)
    })

    it('should get value from object', () => {
      const value = get({ a: { b: [{ c: 1 }] } }, ['a', 'b', 1, 'c'], 2)
      expect(value).toBe(2)
    })
  })

  describe('shallowEqual', () => {
    // ========= true =========

    it('should return true for same object', () => {
      const obj = { a: 1, b: 2 }
      expect(shallowEqual(obj, obj)).toBe(true)
    })

    it('should return true for same object', () => {
      const obj = { a: 1, b: 2 }
      expect(shallowEqual(obj, { a: 1, b: 2 })).toBe(true)
    })

    it('should return true for same object', () => {
      const arr = [1, 2, 3]
      const obj = { a: 1, b: 2, arr }
      arr[0]++
      expect(shallowEqual(obj, { a: 1, b: 2, arr })).toBe(true)
    })

    it('should return true for same object', () => {
      const subObj = { value: 1 }
      const obj = { a: 1, b: 2, subObj }
      subObj.value++
      expect(shallowEqual(obj, { a: 1, b: 2, subObj })).toBe(true)
    })

    it('should return true for same Map', () => {
      const map = new Map([['a', 1]])
      expect(shallowEqual(map, map)).toBe(true)
    })

    it('should return true for same Map', () => {
      const map = new Map([['a', 1]])
      expect(shallowEqual(map, new Map([['a', 1]]))).toBe(true)
    })

    it('should return true for same Set', () => {
      const set = new Set([1, 2, 3])
      expect(shallowEqual(set, set)).toBe(true)
    })

    it('should return true for same Set', () => {
      const set = new Set([1, 2, 3])
      expect(shallowEqual(set, new Set([1, 2, 3]))).toBe(true)
    })

    // ========= false =========

    it('should return false for different value', () => {
      const obj = { a: 1, b: 2 }
      expect(shallowEqual(obj, null)).toBe(false)
    })

    it('should return false for different value', () => {
      const obj = undefined
      expect(shallowEqual(obj, { a: 1, b: 2 })).toBe(false)
    })

    it('should return false for different object', () => {
      const obj = { a: 1, b: 2 }
      expect(shallowEqual(obj, { a: 1, b: 3 })).toBe(false)
    })

    it('should return false for different object', () => {
      const obj = { a: 1, b: 2 } as never
      expect(shallowEqual(obj, { a: 1, b: 2, c: 3 })).toBe(false)
    })

    it('should return false for different object', () => {
      const obj = { a: 1, b: 2 } as never
      expect(shallowEqual(obj, { a: 1 })).toBe(false)
    })

    it('should return false for different object', () => {
      const arr = [1, 2, 3]
      const obj = { a: 1, b: 2, arr: [1, 2, 3, arr] }
      arr[0]++
      expect(shallowEqual(obj, { a: 1, b: 2, arr: [1, 2, 3, arr] })).toBe(false)
    })

    it('should return false for different object', () => {
      const subObj = { value: 1 }
      const obj = { a: 1, b: 2, obj: { key: subObj } }
      subObj.value++
      expect(shallowEqual(obj, { a: 1, b: 2, obj: { key: subObj } })).toBe(false)
    })

    it('should return false for difference Map', () => {
      const map = new Map([['a', 1]])
      expect(shallowEqual(map, new Map([['a', 2]]))).toBe(false)
    })

    it('should return false for difference Map', () => {
      const map = new Map([
        ['a', 1],
        ['b', 2],
      ])
      expect(shallowEqual(map, new Map([['a', 1]]))).toBe(false)
    })

    it('should return false for difference Set', () => {
      const set = new Set([1, 2, 3])
      expect(shallowEqual(set, new Set([1, 2, 4]))).toBe(false)
    })

    it('should return false for difference Set', () => {
      const set = new Set([1, 2, 3])
      expect(shallowEqual(set, new Set([1, 2]))).toBe(false)
    })
  })
})
