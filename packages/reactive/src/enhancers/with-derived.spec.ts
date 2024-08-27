import { describe, expect, it } from 'vitest'
import { create } from './../vanilla/create.js'
import { withDerived } from './index.js'

describe('withDerived', () => {
  it('should return the original store', () => {
    const store = withDerived(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
    )

    expect(store.derived()).toEqual({
      count: 123,
      info: { name: 'Viki' },
    })
  })

  it('should return the derived state', () => {
    const store = withDerived(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
      (s) => ({
        isViki: s.info.name === 'Viki',
        isNegative: s.count < 0,
      }),
    )

    const derivedState = store.derived()
    expect(derivedState.isViki).toBe(true)
    expect(derivedState.isNegative).toBe(false)
  })

  it('should update the derived state when the store state changes', () => {
    const store = withDerived(
      create({
        count: 123,
        info: { name: 'Viki' },
      }),
      (s) => ({
        isViki: s.info.name === 'Viki',
        isNegative: s.count < 0,
      }),
    )

    const derivedState = store.derived()
    expect(derivedState.isViki).toBe(true)
    expect(derivedState.isNegative).toBe(false)

    store.mutate.count = -3

    const updatedDerivedState = store.derived()
    expect(updatedDerivedState.isViki).toBe(true)
    expect(updatedDerivedState.isNegative).toBe(true)
  })
})
