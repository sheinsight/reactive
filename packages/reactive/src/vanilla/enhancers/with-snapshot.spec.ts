import { describe, expect, it } from 'vitest'
import { create } from '../create.js'
import { withSnapshot } from './with-snapshot.js'

describe('withSnapshot', () => {
  it('should return a store with a snapshot method', () => {
    const store = create({ count: 0 })
    const enhancedStore = withSnapshot(store)

    expect(typeof enhancedStore.snapshot).toBe('function')
  })

  it('should return the entire state when no selector is provided', () => {
    const store = create({ count: 0, info: { name: 'John' } })
    const enhancedStore = withSnapshot(store)

    const snapshot = enhancedStore.snapshot()

    expect(snapshot).toEqual({ count: 0, info: { name: 'John' } })
  })

  it('should return a selected slice of the state when a selector is provided', () => {
    const store = create({ count: 0, info: { name: 'John' } })
    const enhancedStore = withSnapshot(store)

    const snapshot = enhancedStore.snapshot((state) => state.count)

    expect(snapshot).toBe(0)
  })

  it('should return a selected slice of the state when state changed', () => {
    const store = create({ count: 0, info: { name: 'John' } })
    const enhancedStore = withSnapshot(store)

    const snapshot = enhancedStore.snapshot((state) => state.count)

    expect(snapshot).toBe(0)

    store.mutate.count = 10

    const updatedSnapshot = enhancedStore.snapshot((state) => state.count)

    expect(updatedSnapshot).toBe(10)
  })
})
