import {
  LISTENERS,
  REACTIVE,
  SNAPSHOT,
  canProxy,
  createObjectFromPrototype,
  isObject,
} from '../utils/index.js'
import { hasRef } from './ref.js'
import { getSnapshot } from './get-snapshot.js'

let globalVersion = 1

const snapshotCache = new WeakMap<object, [version: number, snapshot: unknown]>()

export type Listener = (props: PropertyKey[], version?: number) => void

export function proxy<State extends object>(
  initState: State,
  parentProps: PropertyKey[] = []
): State {
  let version = globalVersion

  // for all changes including nested objects, stored in `proxyState[LISTENERS]`
  const listeners = new Set<Listener>()

  // only for changes in the current object, stored in function scope
  const propListenerMap = new Map<PropertyKey, Listener>()

  const notifyUpdate = (props: PropertyKey[], nextVersion = ++globalVersion) => {
    if (version !== nextVersion) {
      version = nextVersion
      for (const callback of listeners) {
        callback(props, version)
      }
    }
  }

  const getPropListener = (prop: PropertyKey) => {
    let listener = propListenerMap.get(prop)
    if (!listener) {
      listener = (props: PropertyKey[]) => void notifyUpdate(props)
      propListenerMap.set(prop, listener)
    }
    return listener
  }

  const popPropListener = (prop: PropertyKey) => {
    const listener = propListenerMap.get(prop)
    propListenerMap.delete(prop)
    return listener
  }

  const createSnapshot = <State extends object>(target: State, receiver: any) => {
    const cache = snapshotCache.get(receiver)
    if (cache?.[0] === version) return cache[1]

    const snapshot = createObjectFromPrototype(target)
    snapshotCache.set(receiver, [version, snapshot])

    for (const key of Reflect.ownKeys(target)) {
      if (key === REACTIVE) continue

      const value: any = Reflect.get(target, key, receiver)

      if (hasRef(value)) {
        snapshot[key as keyof State] = value
      } else if (value?.[REACTIVE]) {
        snapshot[key as keyof State] = getSnapshot(value)
      } else {
        snapshot[key as keyof State] = value
      }
    }

    Object.preventExtensions(snapshot)

    return snapshot
  }

  const baseObject = createObjectFromPrototype(initState)

  const proxyState = new Proxy(baseObject, {
    get(target, prop, receiver) {
      if (prop === LISTENERS) {
        return listeners
      }
      if (prop === SNAPSHOT) {
        return createSnapshot(target, receiver)
      }
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      const props = [...parentProps, prop]
      const preValue = Reflect.get(target, prop, receiver)

      // when set a new object to `prop`, we need to remove the old listeners
      // in outdated object in `prop`, which is not in proxy state anymore
      // meanwhile, we need to pop the old listener from `propListenerMap`
      const childListeners = (preValue as any)?.[LISTENERS]
      if (childListeners) childListeners.delete(popPropListener(prop))

      if (!isObject(value) && Object.is(preValue, value)) {
        // `return true` means the operation is successful,
        // but we don't need to notify the update here,
        // because the value is basic value, and it's the same as before
        return true
      }

      let nextValue = value

      if (nextValue?.[LISTENERS]) {
        // if the value is a proxy object, we need to merge the listeners
        nextValue[LISTENERS].add(getPropListener(prop))
      } else if (canProxy(value)) {
        nextValue = proxy(value, props)
        nextValue[LISTENERS].add(getPropListener(prop))
      }

      const success = Reflect.set(target, prop, nextValue, receiver)
      success && notifyUpdate(props)
      return success
    },
    deleteProperty(target: State, prop: string | symbol) {
      const props = [...parentProps, prop]
      const childListeners = (Reflect.get(target, prop) as any)?.[LISTENERS]
      if (childListeners) childListeners.delete(popPropListener(prop))
      const success = Reflect.deleteProperty(target, prop)
      success && notifyUpdate(props)
      return success
    },
  })

  for (const key of Reflect.ownKeys(initState)) {
    proxyState[key as keyof State] = initState[key as keyof State]
  }

  Reflect.defineProperty(proxyState, REACTIVE, { value: true })

  return proxyState
}
