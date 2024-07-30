import { beforeAll, describe, expect, it, vi } from 'vitest'

import { LISTENERS } from '../utils'
import { devtools } from './devtools'

const subscribeMock = vi.fn()

const mockGlobal = () => {
  window.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect: () => ({
      init: () => void 0,
      send: () => void 0,
      subscribe: subscribeMock,
      unsubscribe: () => void 0,
      error: () => void 0,
    }),
  } as never
}

const restoreGlobal = () => {
  window.__REDUX_DEVTOOLS_EXTENSION__ = undefined
}

beforeAll(() => void mockGlobal())

const mockState = { mutate: { [LISTENERS]: new Set() } } as never

describe('devtools', () => {
  it('should be a function', () => {
    expect(typeof devtools).toBe('function')
  })

  it('should log warn if window.__REDUX_DEVTOOLS_EXTENSION__ is not defined', () => {
    restoreGlobal()

    const spy = vi.spyOn(console, 'warn')
    devtools(mockState, { name: 'test' })
    expect(spy).toHaveBeenCalled()

    mockGlobal()
  })

  it('should have a name option', () => {
    expect(() => {
      // @ts-expect-error for testing purpose
      return devtools(mockState)
    }).not.toThrowError() // default name is 'untitled'

    expect(() => {
      devtools(mockState, { name: 'test' })
    }).not.toThrowError()
  })

  it('should return a function', () => {
    const fn = devtools(mockState, { name: 'test' })
    expect(typeof fn).toBe('function')
  })

  it('should call devtools.connect with options', () => {
    const spy = vi.spyOn(window.__REDUX_DEVTOOLS_EXTENSION__ as never, 'connect')
    devtools(mockState, { name: 'test' })
    expect(spy).toHaveBeenCalledWith({ name: 'test' })
  })
})
