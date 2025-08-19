import { isRef } from '../vanilla/ref.js'
import { reactFastCompare } from './react-fast-compare.js'

export type ExpandType<T> = {
  [K in keyof T]: T[K]
}

export type DeepExpandType<T> = {
  [K in keyof T]: T[K] extends object ? DeepExpandType<T[K]> : T[K]
}

export type AnyFunc = (...args: any[]) => any

export const SNAPSHOT = Symbol('SNAPSHOT')
export const LISTENERS = Symbol('LISTENERS')
export const REACTIVE = Symbol('REACTIVE')
export const PROXY_COUNT = Symbol('PROXY_COUNT')

export const isProduction = process.env.NODE_ENV === 'production'

export const noop = () => {}
export const hasOwn = Object.prototype.hasOwnProperty
export const isObject = (x: unknown): x is object => typeof x === 'object' && x !== null
export const isBoolean = (x: unknown): x is boolean => typeof x === 'boolean'
export const isFunction = (x: unknown): x is (...args: any[]) => any => typeof x === 'function'

export function createObjectFromPrototype<T extends object>(target: T): T {
  return (Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target))) as T
}

export function canProxy(x: unknown) {
  return (
    isObject(x) &&
    !isRef(x) &&
    (Array.isArray(x) || !(Symbol.iterator in x)) &&
    !(x instanceof WeakMap) &&
    !(x instanceof WeakSet) &&
    !(x instanceof Error) &&
    !(x instanceof Number) &&
    !(x instanceof Date) &&
    !(x instanceof String) &&
    !(x instanceof RegExp) &&
    !(x instanceof ArrayBuffer)
  )
}

const numberReg = /^\d+$/

export function propertyKeysToPath(keys: PropertyKey[]) {
  let path = ''
  const { length } = keys
  for (let i = 0; i < length; i++) {
    const key = keys[i]
    if (typeof key === 'number' || (typeof key === 'string' && numberReg.test(key))) {
      path += `[${key}]`
    } else {
      path += (i === 0 ? '' : '.') + String(key)
    }
  }
  return path
}

export function get(
  object: object,
  path: PropertyKey | PropertyKey[],
  defaultValue: unknown = undefined
) {
  const keys = Array.isArray(path) ? path : [path]
  for (const key of keys) {
    if (!(key in object)) return defaultValue
    // biome-ignore lint/style/noParameterAssign: internal usage
    object = object[key as never]
  }
  return object
}

export function shallowEqual<T>(objA: T, objB: T) {
  if (Object.is(objA, objB)) {
    return true
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false

    for (const [key, value] of objA) {
      if (!Object.is(value, objB.get(key))) {
        return false
      }
    }
    return true
  }

  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false

    for (const value of objA) {
      if (!objB.has(value)) {
        return false
      }
    }

    return true
  }

  const keysA = Object.keys(objA)

  if (keysA.length !== Object.keys(objB).length) {
    return false
  }

  const keysLength = keysA.length

  for (let i = 0; i < keysLength; i++) {
    if (
      !hasOwn.call(objB, keysA[i] as string) ||
      !Object.is(objA[keysA[i] as keyof T], objB[keysA[i] as keyof T])
    ) {
      return false
    }
  }

  return true
}

export function deepEqual<T>(objA: T, objB: T) {
  return reactFastCompare(objA, objB)
}
