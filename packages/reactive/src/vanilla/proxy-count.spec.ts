import { describe, expect, it } from 'vitest'

import { create } from './create.js'
import { proxyCount } from './proxy-count.js'

describe('proxyCount', () => {
  it('should be defined', () => {
    expect(proxyCount).toBeDefined()
  })

  it('should return 0 for non-proxy objects', () => {
    const plainObject = { count: 0 }
    expect(proxyCount(plainObject)).toBe(0)
  })

  it('should return 0 for null or undefined', () => {
    expect(proxyCount(null as any)).toBe(0)
    expect(proxyCount(undefined as any)).toBe(0)
  })

  it('should count itself as 1 for simple reactive state', () => {
    const store = create({ count: 0 })
    expect(proxyCount(store.mutate)).toBe(1)
  })

  it('should count nested proxy objects', () => {
    const store = create({ count: 0, obj: { a: 1 } })

    // Root object includes itself (1) + nested obj when accessed (1) = 2
    expect(proxyCount(store.mutate)).toBe(2)

    // Nested object only counts itself
    expect(proxyCount(store.mutate.obj)).toBe(1)
  })

  it('should increment count when creating new nested proxies', () => {
    const store = create({ count: 0, obj: { a: 1 } } as any)

    // Initially: root + obj = 2
    expect(proxyCount(store.mutate)).toBe(2)

    // Add new nested object
    store.mutate.obj.b = { c: 2 }

    // Now: root + obj + b = 3
    expect(proxyCount(store.mutate)).toBe(3)
    expect(proxyCount(store.mutate.obj)).toBe(2) // obj + b
    expect(proxyCount(store.mutate.obj.b)).toBe(1) // only b itself
  })

  it('should handle array proxies', () => {
    const store = create({ items: [{ id: 1 }] })

    // Trigger proxy creation by accessing array elements
    store.mutate.items[0].id = 10

    // Root + items array + 1 item object = 3
    expect(proxyCount(store.mutate)).toBe(3)
    expect(proxyCount(store.mutate.items)).toBe(2) // array + 1 item
  })

  it('should decrease count when deleting proxy properties', () => {
    const store = create({ a: { value: 1 }, b: { value: 2 } } as any)

    // Initially: root + a + b = 3
    expect(proxyCount(store.mutate)).toBe(3)

    // Delete one property
    delete store.mutate.a

    // Check actual count after deletion
    expect(proxyCount(store.mutate)).toBe(2) // root + b
  })

  it('should handle deeply nested objects', () => {
    const store = create({
      level1: {
        level2: {
          level3: {
            value: 'deep',
          },
        },
      },
    })

    // Access all levels to create proxies
    store.mutate.level1.level2.level3.value = 'modified'

    expect(proxyCount(store.mutate)).toBe(4) // root + level1 + level2 + level3
    expect(proxyCount(store.mutate.level1)).toBe(3) // level1 + level2 + level3
    expect(proxyCount(store.mutate.level1.level2)).toBe(2) // level2 + level3
    expect(proxyCount(store.mutate.level1.level2.level3)).toBe(1) // only level3
  })

  it('should handle property type changes', () => {
    const store = create({ prop: 'string' as any })

    // Initially only root
    expect(proxyCount(store.mutate)).toBe(1)

    // Change from string to object
    store.mutate.prop = { nested: 'value' }

    // Access nested to create proxy
    store.mutate.prop.nested = 'changed'

    // Now: root + prop object = 2
    expect(proxyCount(store.mutate)).toBe(2)
  })
})
