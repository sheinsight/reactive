import { proxy } from './proxy.js'
import { withSubscribe } from '../enhancers/with-subscribe.js'

import type { SubscribeListener } from './subscribe.js'
import type { WithSubscribeContributes } from '../enhancers/with-subscribe.js'

// biome-ignore lint/suspicious/noEmptyInterface: for future use
export interface StoreCreateOptions {}

export type StoreSubscriber<State extends object> = (
  /**
   * Callback to be called when state changes.
   */
  callback: SubscribeListener<State>,
  /**
   * Whether to sync the callback with the current state.
   */
  sync?: boolean,
  /**
   * @deprecated It is confusing, and makes TS type wrong in callback's `changes` argument. It will be removed in the next major version.
   */
  selector?: (state: State) => object,
) => () => void

export type VanillaStore<State extends object> = {
  /**
   * The mutable state object, whose changes will trigger subscribers.
   */
  mutate: State
  /**
   * Restore to initial state.
   */
  restore: () => void
}

/**
 * Create a vanilla store.
 *
 * @param initState The initial state object.
 * @param options Options for creating the store.
 */
export function createVanilla<State extends object>(
  initState: State,
  options: StoreCreateOptions = {},
): VanillaStore<State> & WithSubscribeContributes<State> {
  const proxyState = proxy(initState)

  function restore() {
    const clonedState = structuredClone(initState)

    for (const key of Object.keys(clonedState)) {
      proxyState[key as keyof State] = clonedState[key as keyof State]
    }
  }

  const store = { mutate: proxyState, restore }

  return withSubscribe(store)
}

/**
 * @deprecated Use `createVanilla` instead. Will be removed in the next major version.
 */
export const create = createVanilla
