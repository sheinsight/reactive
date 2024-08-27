import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { create } from '../vanilla/index.js'
import { withUseDerived } from '../enhancers/with-use-derived.js'

describe('withUseDerived', () => {
  it('should return the derived state', () => {
    const store = withUseDerived(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
      (s) => ({
        isViki: s.info.name === 'Viki',
        isNegative: s.count < 0,
      }),
    )

    const { result } = renderHook(() => store.useDerived())

    expect(result.current.isViki).toBe(true)
    expect(result.current.isNegative).toBe(false)
  })

  it('should update the derived state when the store state changes', async () => {
    const store = withUseDerived(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
      (s) => ({
        isViki: s.info.name === 'Viki',
        isNegative: s.count < 0,
      }),
    )

    const { result } = renderHook(() => store.useDerived())

    expect(result.current.isViki).toBe(true)
    expect(result.current.isNegative).toBe(false)

    await act(async () => {
      store.mutate.count = -5
    })

    expect(result.current.isViki).toBe(true)
    expect(result.current.isNegative).toBe(true)
  })

  it('should update the derived state synchronously when set `sync` to true', async () => {
    const store = withUseDerived(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
      (s) => ({
        isViki: s.info.name === 'Viki',
        isNegative: s.count < 0,
      }),
    )

    const { result } = renderHook(() => store.useDerived({ sync: true }))

    expect(result.current.isViki).toBe(true)
    expect(result.current.isNegative).toBe(false)

    // no need `await`
    act(() => {
      store.mutate.count = -5
    })

    expect(result.current.isViki).toBe(true)
    expect(result.current.isNegative).toBe(true)
  })
})
