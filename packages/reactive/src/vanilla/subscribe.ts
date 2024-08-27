import { LISTENERS, get, propertyKeysToPath } from '../utils/index.js'
import { snapshot } from './snapshot.js'

import type { StoreListener } from './proxy.js'

export type ChangeItem<State> = {
  props: PropertyKey[]
  propsPath: string
  previous: unknown
  current: unknown
  snapshot: State
}

/**
 * @deprecated Use `SubscribeCallback` instead. Will be removed in the next major version.
 */
export type SubscribeCallback<State> = SubscribeListener<State>

export type SubscribeListener<State> = (changes: ChangeItem<State>, version?: number) => void

export function subscribe<State extends object>(
  proxyState: State,
  callback: SubscribeListener<State>,
  notifyInSync?: boolean,
) {
  let promise: Promise<void> | undefined
  let previousState = snapshot(proxyState)
  const callbacks = new Set<() => void>()

  const runCallbacks = () => {
    for (const callback of callbacks) {
      callback()
    }
    callbacks.clear()
    previousState = snapshot(proxyState)
  }

  function listener(props: PropertyKey[], version?: number) {
    const currentState = snapshot(proxyState)

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
  ;((proxyState as any)[LISTENERS] as Set<StoreListener>).add(listener)

  return () => {
    ;((proxyState as any)[LISTENERS] as Set<StoreListener>).delete(listener)
  }
}
