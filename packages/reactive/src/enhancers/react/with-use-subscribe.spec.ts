import { describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { withUseSubscribe } from './with-use-subscribe.js'
import { createVanilla } from '../../vanilla/create.js'

describe('withUseSubscribe', () => {
  it('should enhance the store with useSubscribe method', () => {
    const store = withUseSubscribe(createVanilla({ count: 0 }))
    expect(typeof store.useSubscribe).toBe('function')
  })

  it('should subscribe to store state changes', async () => {
    const store = withUseSubscribe(createVanilla({ count: 0 }))
    const listener = vi.fn()

    renderHook(() => store.useSubscribe(listener))

    await act(async () => {
      store.mutate.count = 1
    })

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should notify the listener in sync', () => {
    const store = withUseSubscribe(createVanilla({ count: 0 }))
    const listener = vi.fn()

    renderHook(() => store.useSubscribe(listener, true))

    // no need `await` here
    act(() => {
      store.mutate.count = 1
    })

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should not notify the listener when unmounted', async () => {
    const store = withUseSubscribe(createVanilla({ count: 0 }))
    const listener = vi.fn()

    const { unmount } = renderHook(() => store.useSubscribe(listener))

    unmount()

    await act(async () => {
      store.mutate.count = 1
    })

    expect(listener).toHaveBeenCalledTimes(0)
  })
})
