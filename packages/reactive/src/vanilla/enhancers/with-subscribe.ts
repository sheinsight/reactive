import { subscribe } from '../subscribe.js'

import type { SubscribeListener, VanillaStore } from '../index.js'

export interface WithSubscribeContributes<State extends object> {
  /**
   * Subscribe to the store's state changes.
   *
   * @param listener - The listener to be called when the state changes.
   * @param sync - Whether to call the listener synchronously.
   * @param selector - A selector to select a part of the state to be passed to the listener.
   */
  subscribe: (
    listener: SubscribeListener<State>,
    sync?: boolean,
    selector?: (state: State) => object
  ) => () => void
}

/**
 * Enhance a store with the `subscribe` method.
 *
 * @param store - The store to be enhanced.
 * @returns The enhanced store.
 *
 * @since 0.2.0
 *
 * @example
 *
 * ```ts
 * import { createVanilla, withSubscribe } from '@reactive-react/core'
 *
 * const store = withSubscribe(createVanilla({ count: 0 }))
 *
 * const unsubscribe = store.subscribe((state) => {
 *   console.log(state.count)
 * })
 * ```
 *
 */
export function withSubscribe<Store extends VanillaStore<object>>(
  store: Store
): Store & WithSubscribeContributes<Store['mutate']> {
  function boundSubscribe(
    listener: SubscribeListener<Store['mutate']>,
    sync?: boolean,
    selector: (state: Store['mutate']) => object = (s: Store['mutate']) => s
  ) {
    return subscribe(selector(store.mutate) as Store['mutate'], listener, sync)
  }

  return {
    ...store,
    subscribe: boundSubscribe,
  }
}
