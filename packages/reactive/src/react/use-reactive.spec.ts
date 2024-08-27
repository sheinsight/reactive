import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useReactive } from './use-reactive.js'

describe('useReactive', () => {
  it('should return initial state', () => {
    const initialState = { count: 0 }
    const { result } = renderHook(() => useReactive(initialState))
    expect(result.current[0]).toEqual(initialState)
  })

  it('should update state', async () => {
    const initialState = { count: 0 }
    const { result } = renderHook(() => useReactive(initialState))
    const [, mutate] = result.current

    // `await` is needed to test async, for Reactive is batched async by default
    await act(async () => {
      mutate.count = 1
    })

    expect(result.current[0]).toEqual({ count: 1 })
  })

  it('should return different state reference', async () => {
    const initialState = { count: 0 }
    const { result } = renderHook(() => useReactive(initialState))
    const [state1, mutate] = result.current

    await act(async () => {
      mutate.count = 1
    })

    const state2 = result.current[0]
    expect(state1).not.toBe(state2)
  })

  it('should return updated state reference', async () => {
    const initialState = { count: 0 }
    const { result } = renderHook(() => useReactive(initialState))
    const [, mutate] = result.current

    await act(async () => {
      mutate.count = 1
    })

    const state2 = result.current[0]
    expect(state2).toEqual({ count: 1 })
  })

  it('should update synchronously', () => {
    const initialState = { count: 0 }
    const { result } = renderHook(() => useReactive(initialState, { sync: true }))
    const [, mutate] = result.current

    // no need `await` to test sync, when set `sync: true`
    act(() => {
      mutate.count = 1
    })

    expect(result.current[0]).toEqual({ count: 1 })
  })
})
