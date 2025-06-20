import { withSnapshot } from '../enhancers/vanilla/with-snapshot.js'
import { withSubscribe } from '../enhancers/vanilla/with-subscribe.js'
import { proxy } from './proxy.js'
import { deepCloneWithRef } from './ref.js'

import type { WithSnapshotContributes } from '../enhancers/vanilla/with-snapshot.js'
import type { WithSubscribeContributes } from '../enhancers/vanilla/with-subscribe.js'
import type { SubscribeListener } from './subscribe.js'

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
  selector?: (state: State) => object
) => () => void

export interface VanillaStore<State extends object> {
  /**
   * The mutable state object, whose changes will trigger subscribers.
   */
  mutate: State
  /**
   * Restore to initial state.
   */
  restore: (options?: RestoreOptions<State>) => void
}

export interface RestoreOptions<State extends object> {
  /**
   * Exclude some **top** keys from restoring.
   *
   * @since 0.2.5
   */
  exclude?: (keyof State)[]
}

/**
 * Create a vanilla store.
 *
 * @param initState The initial state object.
 * @param options Options for creating the store.
 *
 * @since 0.2.0
 */
export function createVanilla<State extends object>(
  initState: State,
  _options: StoreCreateOptions = {}
): VanillaStore<State> & WithSubscribeContributes<State> & WithSnapshotContributes<State> {
  const proxyState = proxy(initState)

  function restore(options: RestoreOptions<State> = {}) {
    const { exclude = [] } = options

    const clonedState = deepCloneWithRef(initState)

    for (const key of Object.keys(clonedState)) {
      if (exclude.includes(key as keyof State)) continue
      proxyState[key as keyof State] = clonedState[key as keyof State]
    }
  }

  const store = { mutate: proxyState, restore }

  return withSubscribe(withSnapshot(store))
}

export const create = createVanilla
