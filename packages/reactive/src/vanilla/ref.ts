import { createObjectFromPrototype, isObject } from '../utils'

const internal_refSet = new WeakSet()

export function ref<T extends object>(o: T): T {
  internal_refSet.add(o)
  return o
}

export function isRef<T extends object>(k: T): boolean {
  return internal_refSet.has(k)
}

export function deepCloneWithRef<State extends object>(initialState: State): State {
  const cloned: State = createObjectFromPrototype(initialState)

  for (const key in initialState) {
    const value = initialState[key as keyof State]

    if (isObject(value)) {
      if (isRef(value)) {
        cloned[key as keyof State] = value
      } else {
        cloned[key as keyof State] = deepCloneWithRef(value)
      }
    } else {
      cloned[key as keyof State] = value
    }
  }

  return cloned
}
