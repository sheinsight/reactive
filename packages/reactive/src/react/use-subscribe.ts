import { useEffect, useRef } from 'react'
import { subscribe } from '../vanilla/subscribe'

import type { SubscribeListener } from '../vanilla/subscribe'

/**
 * Subscribes to the store state changes in React components.
 *
 * @param proxyState - The store state.
 * @param listener - The listener function.
 * @param notifyInSync - Whether to notify the listener in sync.
 *
 * @since 0.2.0
 */
export function useSubscribe<State extends object>(
  proxyState: State,
  listener: SubscribeListener<State>,
  notifyInSync?: boolean
) {
  // useLatest
  const listenerRef = useRef(listener)
  listenerRef.current = listener

  useEffect(() => {
    const unsubscribe = subscribe(
      proxyState,
      (...args) => listenerRef.current(...args),
      notifyInSync
    )

    return unsubscribe
  }, [proxyState, notifyInSync])
}
