import { getSnapshot } from './get-snapshot.js'
import { LISTENERS, get, propertyKeysToPath } from '../utils/index.js'

import type { Listener } from './proxy.js'

export type ChangeItem<State> = {
  props: PropertyKey[]
  propsPath: string
  previous: unknown
  current: unknown
  snapshot: State
}

export type SubscribeCallback<State> = (changes: ChangeItem<State>, version?: number) => void

export function subscribe<State extends object>(
  proxyState: State,
  callback: SubscribeCallback<State>,
  notifyInSync?: boolean
) {
  let promise: Promise<void> | undefined
  let previousState = getSnapshot(proxyState)
  const callbacks = new Set<() => void>()

  const runCallbacks = () => {
    for (const callback of callbacks) {
      callback()
    }
    callbacks.clear()
    previousState = getSnapshot(proxyState)
  }

  function listener(props: PropertyKey[], version?: number) {
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

  ;((proxyState as any)[LISTENERS] as Set<Listener>).add(listener)

  return () => {
    ;((proxyState as any)[LISTENERS] as Set<Listener>).delete(listener)
  }
}
