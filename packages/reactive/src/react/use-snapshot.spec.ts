import { describe, it, expect } from 'vitest'
import { act, waitFor, renderHook } from '@testing-library/react'

import { useSnapshot } from './use-snapshot.js'
import { proxy, getSnapshot } from '../vanilla/index.js'

describe('useSnapShot', () => {
  it('should be defined', () => {
    expect(useSnapshot).toBeDefined()
  })

  it('should return snapshot', () => {
    const proxyState = proxy({ name: 'Bob' })
    const { result } = renderHook(() => useSnapshot(proxyState))
    expect(result.current).toEqual(getSnapshot(proxyState))
  })

  it('should update snapshot', async () => {
    const proxyState = proxy({
      address: {
        city: {
          name: 'Shanghai',
        },
      },
    })

    const { result } = renderHook(() => useSnapshot(proxyState))

    act(() => {
      // default async batch update is enabled for refine render performance
      proxyState.address.city.name = 'any previous value'
      proxyState.address.city.name = 'Nanjing'
    })

    // update are async, in this sync context, it will still be "Shanghai"
    expect(result.current.address.city.name).toEqual('Shanghai')

    await waitFor(() => {
      // after async batch update, this will be "Nanjing"
      expect(result.current.address.city.name).toEqual('Nanjing')
    })
  })

  it('basic selector should be work', () => {
    const proxyState = proxy({ name: 'Bob' })
    const { result } = renderHook(() => useSnapshot(proxyState, (s) => s.name))
    expect(result.current).toEqual('Bob')
  })

  it('return array selector should be work', () => {
    const proxyState = proxy({ name: 'Bob', age: 32 })
    const { result } = renderHook(() => {
      const [name, age] = useSnapshot(proxyState, (s) => [s.name, s.age])
      return [name, age]
    })
    expect(result.current).toMatchObject(['Bob', 32])
  })

  it('selector should refine render performance', async () => {
    const proxyState = proxy({ name: 'Bob', other: 'other' })
    const { result } = renderHook(() => useSnapshot(proxyState, (s) => s.name))

    act(() => {
      proxyState.other = 'other value'
    })
  })

  it('should return updated proxyState snapshot with sync option', async () => {
    const proxyState = proxy({ address: { city: { name: 'Shanghai' } } })
    const { result } = renderHook(() => useSnapshot(proxyState, { sync: true }))
    act(() => (proxyState.address.city.name = 'Nanjing'))
    // when sync is enabled, it will be "Nanjing" as it is sync update
    expect(result.current.address.city.name).toEqual('Nanjing')
  })

  it('should return updated proxyState snapshot with sync option', async () => {
    const proxyState = proxy({ address: { city: { name: 'Shanghai' } } })
    const { result } = renderHook(() => useSnapshot(proxyState, undefined, { sync: true }))
    act(() => (proxyState.address.city.name = 'Nanjing'))
    // when sync is enabled, it will be "Nanjing" as it is sync update
    expect(result.current.address.city.name).toEqual('Nanjing')
  })

  it('should return updated proxyState snapshot with custom isEqual', async () => {
    const proxyState = proxy({ address: { city: { name: 'Shanghai' } } })
    const { result } = renderHook(() =>
      useSnapshot(proxyState, (s) => s.address.city, { isEqual: (pre, cur) => pre === cur })
    )
    act(() => (proxyState.address.city.name = 'Nanjing'))
    // update are sync, in this sync context, it will still be "Shanghai"
    expect(result.current.name).toEqual('Shanghai')
  })

  it('should return updated proxyState snapshot with custom isEqual', async () => {
    const proxyState = proxy({ address: { city: { name: 'Shanghai' } } })
    const { result } = renderHook(() =>
      useSnapshot(proxyState, (s) => s.address.city, {
        sync: true,
        isEqual: (pre, cur) => pre === cur,
      })
    )
    act(() => (proxyState.address.city.name = 'Nanjing'))
    expect(result.current.name).toEqual('Nanjing')
  })

  it('should return conditionally updated proxyState snapshot with custom isEqual', async () => {
    const proxyState = proxy({ count: 0 })
    const { result } = renderHook(() =>
      useSnapshot(proxyState, (s) => s.count, { sync: true, isEqual: (pre, cur) => cur - pre < 2 })
    )
    act(() => proxyState.count++)
    expect(result.current).toEqual(0)

    act(() => proxyState.count++)
    expect(result.current).toEqual(2)

    act(() => proxyState.count++)
    expect(result.current).toEqual(2)

    act(() => proxyState.count++)
    expect(result.current).toEqual(4)
  })
})
