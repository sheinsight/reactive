import { getSnapshot } from './get-snapshot.js'
import { LISTENERS, get, propertyKeysToPath } from '../utils/index.js'

import type { Listener } from './proxy.js'

export type SubscribeCallback<T> = (
  changes: {
    props: PropertyKey[]
    propsPath: string
    previous: unknown
    current: unknown
    snapshot: T
  },
  version?: number
) => void

export function subscribe<T extends object>(
  proxyState: T,
  callback: SubscribeCallback<T>,
  notifyInSync?: boolean
) {
  let promise: Promise<void> | undefined
  let previousState = getSnapshot(proxyState)
  const callbacks = new Set<() => void>()

  const runCallbacks = () => {
    callbacks.forEach((cb) => void cb())
    callbacks.clear()
    previousState = getSnapshot(proxyState)
  }

  const listener = (props: PropertyKey[], version?: number) => {
    const currentState = getSnapshot(proxyState)

    const changes = {
      props,
      propsPath: propertyKeysToPath(props),
      previous: get(previousState, props),
      current: get(currentState, props),
      snapshot: currentState,
    }

    callbacks.add(() => void callback(changes, version))

    if (notifyInSync) {
      return void runCallbacks()
    }

    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = undefined
        runCallbacks()
      })
    }
  }

  // FIXME: 只监听全局 store
  ;((proxyState as any)[LISTENERS] as Set<Listener>).add(listener)

  return () => {
    ;((proxyState as any)[LISTENERS] as Set<Listener>).delete(listener)
  }
}
