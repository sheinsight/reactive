import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { withUseSnapshot } from '../enhancers/with-use-snapshot.js'
import { create } from '../vanilla/create.js'

describe('withUseSnapshot', () => {
  it('should enhance a store with useSnapshot method', () => {
    const store = withUseSnapshot(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
    )

    const { result } = renderHook(() => store.useSnapshot())

    expect(result.current).toEqual({ count: 123, info: { name: 'Viki' } })
  })

  it('should return a specific property from the snapshot', () => {
    const store = withUseSnapshot(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
    )

    const { result } = renderHook(() => store.useSnapshot((s) => s.info))

    expect(result.current).toEqual({ name: 'Viki' })
  })

  it('should return right state when changing the store', async () => {
    const store = withUseSnapshot(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
    )

    const { result } = renderHook(() => store.useSnapshot((s) => s.info))

    expect(result.current).toEqual({ name: 'Viki' })

    await act(async () => {
      store.mutate.info.name = 'Viki2'
    })

    expect(result.current).toEqual({ name: 'Viki2' })
  })

  it('should return a specific property from the snapshot with options', async () => {
    const store = withUseSnapshot(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
    )

    const { result } = renderHook(() => store.useSnapshot((s) => s.info, { sync: true }))

    expect(result.current).toEqual({ name: 'Viki' })

    act(() => {
      store.mutate.info.name = 'Viki2'
    })

    expect(result.current).toEqual({ name: 'Viki2' })
  })
})
