import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'

import { createWithHooks } from './create-with-hooks.js'

describe('createWithHooks', () => {
  it('should be defined', () => {
    expect(createWithHooks).toBeDefined()
  })

  it('should return a store with the useSnapshot function', () => {
    const initState = { count: 0 }
    const store = createWithHooks(initState)
    expect(store.useSnapshot).toBeDefined()
  })

  it('should return snapshot state', () => {
    const initState = { count: 0 }
    const store = createWithHooks(initState)
    const { result } = renderHook(() => store.useSnapshot())
    expect(result.current).toEqual(initState)
  })
})
