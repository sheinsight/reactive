import { subscribe } from '../vanilla/subscribe.js'

import type { SubscribeListener, VanillaStore } from '../vanilla/index.js'

export interface WithSubscribeContributes<State extends object> {
  /**
   * Subscribe to the store's state changes.
   *
   * @param listener - The listener to be called when the state changes.
   * @param sync - Whether to call the listener synchronously.
   * @param selector - A selector to select a part of the state to be passed to the listener.
   */
  subscribe: (listener: SubscribeListener<State>, sync?: boolean, selector?: (state: State) => object) => () => void
}

export function withSubscribe<Store extends VanillaStore<object>>(
  store: Store,
): WithSubscribeContributes<Store['mutate']> & Store {
  function boundSubscribe(
    listener: SubscribeListener<Store['mutate']>,
    sync = false,
    selector: (state: Store['mutate']) => object = (s: Store['mutate']) => s,
  ) {
    return subscribe(selector(store.mutate) as Store['mutate'], listener, sync)
  }

  return {
    ...store,
    subscribe: boundSubscribe,
  }
}
