import { useSubscribe } from '../../react/use-subscribe.js'

import type { SubscribeListener, VanillaStore } from '../../vanilla/index.js'

export interface WithUseSubscribeContributes<State extends object> {
  /**
   * Subscribes to the store state changes in React components.
   *
   * @param listener - The listener function.
   * @param notifyInSync - Whether to notify the listener in sync.
   */
  useSubscribe: (listener: SubscribeListener<State>, notifyInSync?: boolean) => void
}

/**
 * Enhance a store with the `useSubscribe` methods.
 *
 * @param store - The store to be enhanced.
 * @returns The enhanced store.
 *
 * @since 0.2.0
 *
 * @example
 *
 * ```ts
 * import { createVanilla, withUseSubscribe } from '@reactive-react/core'
 *
 * const store = withUseSubscribe(createVanilla({ count: 0 }))
 *
 * // In a React component
 * store.useSubscribe((state) => {
 *  console.log(state.count)
 * })
 * ```
 *
 */
export function withUseSubscribe<Store extends VanillaStore<object>>(
  store: Store
): Store & WithUseSubscribeContributes<Store['mutate']> {
  const boundUseSubscribe = (
    listener: SubscribeListener<Store['mutate']>,
    notifyInSync?: boolean
  ) => {
    return useSubscribe(store.mutate, listener, notifyInSync)
  }

  return {
    ...store,
    useSubscribe: boundUseSubscribe,
  }
}
