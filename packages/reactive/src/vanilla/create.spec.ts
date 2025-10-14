import { renderHook } from '@testing-library/react'
import { describe, expect, it, vitest } from 'vitest'

import { useSnapshot } from '../react/use-snapshot.js'
import { create } from './create.js'
import { snapshot } from './snapshot.js'

describe('index', () => {
  it('create, proxy, useSnapshot and subscribe should be defined', () => {
    expect(create).toBeDefined()
  })

  it('should return mutate and subscribe by current state', async () => {
    const store = create({
      name: 'Pikachu',
      address: {
        city: 'NanJing',
      },
    })

    expect(store.mutate).toMatchObject({
      name: 'Pikachu',
      address: {
        city: 'NanJing',
      },
    })

    const { result } = renderHook(() => useSnapshot(store.mutate))
    expect(result.current).toEqual(snapshot(store.mutate))

    const callback = vitest.fn()
    store.subscribe(callback)

    expect(callback).toHaveBeenCalledTimes(0)

    store.mutate.name = 'Charmander'

    await Promise.resolve()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should update properly when notify sync', () => {
    const store = create({
      name: 'Pikachu',
      address: {
        city: 'NanJing',
      },
    })

    const callback = vitest.fn()
    store.subscribe(callback, true)

    store.mutate.name = 'Charmander'
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should restore state when restore function was called', async () => {
    const store = create({
      name: 'Pikachu',
      address: {
        city: 'NanJing',
      },
    })

    store.mutate.name = 'Charmander'
    store.restore()

    await Promise.resolve()

    expect(store.mutate).toMatchObject({
      name: 'Pikachu',
      address: {
        city: 'NanJing',
      },
    })
  })

  it('should not restore excluded keys', async () => {
    const store = create({
      name: 'Pikachu',
      info: {
        age: 10,
      },
      address: {
        city: 'NanJing',
      },
    })

    store.mutate.name = 'Charmander'
    store.mutate.info.age = 20
    store.restore({
      exclude: ['name', 'info'],
    })

    await Promise.resolve()

    expect(store.mutate).toMatchObject({
      name: 'Charmander',
      info: {
        age: 20,
      },
      address: {
        city: 'NanJing',
      },
    })

    store.mutate.name = 'Charmander'
    store.mutate.info.age = 20
    store.restore({
      exclude: ['info'],
    })

    await Promise.resolve()

    expect(store.mutate).toMatchObject({
      name: 'Pikachu',
      info: {
        age: 20,
      },
      address: {
        city: 'NanJing',
      },
    })

    store.mutate.name = 'Charmander'
    store.mutate.info.age = 20
    store.restore({
      exclude: [],
    })

    await Promise.resolve()

    expect(store.mutate).toMatchObject({
      name: 'Pikachu',
      info: {
        age: 10,
      },
      address: {
        city: 'NanJing',
      },
    })
  })

  it('should delete added properties when restore', async () => {
    const store = create({
      name: 'Pikachu',
      address: {
        city: 'NanJing',
      },
    })

    // @ts-expect-error for test
    store.mutate.age = 10
    expect(store.mutate).toMatchObject({
      name: 'Pikachu',
      age: 10,
      address: {
        city: 'NanJing',
      },
    })

    store.restore()

    await Promise.resolve()

    expect(store.mutate).toMatchObject({
      name: 'Pikachu',
      address: {
        city: 'NanJing',
      },
    })
    // @ts-expect-error for test
    expect(store.mutate.age).toBeUndefined()
  })

  it('should subscribe and unsubscribe', async () => {
    const store = create({
      name: 'Pikachu',
      address: {
        city: 'NanJing',
      },
    })

    const callback = vitest.fn()
    const unsubscribe = store.subscribe(callback)

    store.mutate.name = 'Charmander'

    await Promise.resolve()

    expect(callback).toHaveBeenCalledTimes(1)

    unsubscribe()

    store.mutate.name = 'Pikachu'

    await Promise.resolve()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should notify when delete a property', async () => {
    const store = create({
      name: 'Pikachu',
      address: {
        city: 'NanJing',
      },
    })

    const callback = vitest.fn()
    store.subscribe(callback)

    // @ts-expect-error for test
    delete store.mutate.name

    await Promise.resolve()

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
