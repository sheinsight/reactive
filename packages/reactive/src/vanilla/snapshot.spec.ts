import { describe, expect, it } from 'vitest'

import { SNAPSHOT } from '../utils/index.js'
import { proxy } from './proxy.js'
import { getSnapshot } from './snapshot.js'

describe('getSnapshot', () => {
  it('should get snapshot from proxyState', () => {
    const proxyState = { [SNAPSHOT]: 'snapshot' } as any
    expect(getSnapshot(proxyState)).toBe('snapshot')
  })

  it('should return undefined if no snapshot', () => {
    const proxyState = {} as any
    expect(getSnapshot(proxyState)).toBeUndefined()
  })

  it('snapshot from `useSnapShot` can not be extended', () => {
    const proxyState = proxy({
      address: {
        city: {
          name: 'Shanghai',
        } as {
          [key: string]: string
        },
      },
    })

    const snapshot = getSnapshot(proxyState)

    expect(() => {
      snapshot.address.city.size = 'size'
    }).toThrowError('Cannot add property size, object is not extensible')

    expect(snapshot.address.city.size).toEqual(undefined)
  })
})
