import { proxy } from './proxy.js'
import { subscribe } from './subscribe.js'

import type { SubscribeCallback } from './subscribe.js'

// biome-ignore lint/suspicious/noEmptyInterface: for future use
export interface CreateOptions {}

export type StoreSubscriber<State extends object> = (
  /**
   * Callback to be called when state changes.
   */
  callback: SubscribeCallback<State>,
  /**
   * Whether to sync the callback with the current state.
   */
  sync?: boolean,
  /**
   * @deprecated It is confusing, and makes TS type wrong in callback's `changes` argument. It will be removed in the next major version.
   */
  selector?: (state: State) => object
) => () => void

export type VanillaStore<State extends object> = {
  /**
   * The mutable state object, whose changes will trigger subscribers.
   */
  mutate: State
  /**
   * Method to subscribe to state changes.
   */
  subscribe: StoreSubscriber<State>
  /**
   * Restore to initial state.
   */
  restore: () => void
}

/**
 * Create a vanilla store.
 */
export function create<State extends object>(
  initState: State,
  options: CreateOptions = {}
): VanillaStore<State> {
  const proxyState = proxy(initState)

  function restore() {
    const _ = structuredClone(initState)

    for (const key of Object.keys(_)) {
      proxyState[key as keyof State] = _[key as keyof State]
    }
  }

  function boundSubscribe(
    callback: SubscribeCallback<State>,
    sync = false,
    selector: (state: State) => object = (s: State) => s
  ) {
    return subscribe(selector(proxyState) as State, callback, sync)
  }

  return {
    mutate: proxyState,
    subscribe: boundSubscribe,
    restore,
  }
}
