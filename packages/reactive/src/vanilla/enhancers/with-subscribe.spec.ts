import { describe, expect, it, vi } from 'vitest'
import { create } from '../create.js'
import { withSubscribe } from './with-subscribe.js'

describe('withSubscribe', () => {
  it('should subscribe to store state changes', async () => {
    const store = create({ count: 0 })
    const enhancedStore = withSubscribe(store)
    const listener = vi.fn()
    enhancedStore.subscribe(listener)

    enhancedStore.mutate.count += 1
    await Promise.resolve()
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should subscribe to store state changes with selector', async () => {
    const store = create({ count: 0, obj: { name: 'reactive' } })
    const enhancedStore = withSubscribe(store)
    const listener = vi.fn()
    enhancedStore.subscribe(listener, false, (state) => state.obj)

    enhancedStore.mutate.count += 1
    await Promise.resolve()
    expect(listener).toHaveBeenCalledTimes(0)

    enhancedStore.mutate.obj.name = 'vitest'
    await Promise.resolve()
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should subscribe to store state changes with sync', async () => {
    const store = create({ count: 0 })
    const enhancedStore = withSubscribe(store)
    const listener = vi.fn()
    enhancedStore.subscribe(listener, true)

    enhancedStore.mutate.count += 1
    expect(listener).toHaveBeenCalledTimes(1)
  })
})
