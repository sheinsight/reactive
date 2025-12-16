import { useCallback, useEffect, useRef } from 'react'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'
import { isFunction, shallowEqual } from '../utils/index.js'
import { snapshot, subscribe } from '../vanilla/index.js'

import type { SnapshotSelector, SubscribeListener } from '../vanilla/index.js'

export interface SnapshotOptions<StateSlice> {
  /**
   * Whether to notify updates synchronously, default is false, which means updates are batched asynchronously to improve performance.
   *
   * In some scenarios (e.g., using Chinese input method in a text box), it is necessary to immediately obtain the latest state, in which case this can be set to true.
   *
   * @defaultValue false
   */
  sync?: boolean
  /**
   * Custom equality function to compare the previous and next state slices.
   *
   * @defaultValue Object.is
   */
  isEqual?: (a: StateSlice, b: StateSlice) => boolean
}

/**
 * Returns a snapshot of the store state.
 *
 * @since 0.2.0
 */
export function useSnapshot<State extends object>(state: State): State
export function useSnapshot<State extends object>(
  state: State,
  options: SnapshotOptions<State>
): State
export function useSnapshot<State extends object, StateSlice>(
  state: State,
  selector: SnapshotSelector<State, StateSlice>
): StateSlice
export function useSnapshot<State extends object, StateSlice>(
  state: State,
  selector: undefined,
  options: SnapshotOptions<StateSlice>
): State
export function useSnapshot<State extends object, StateSlice>(
  state: State,
  selector?: SnapshotSelector<State, StateSlice>,
  options?: SnapshotOptions<StateSlice>
): StateSlice
export function useSnapshot<State extends object, StateSlice>(
  proxyState: State,
  selectorOrOption?: SnapshotOptions<StateSlice> | SnapshotSelector<State, StateSlice>,
  maybeOptions?: SnapshotOptions<StateSlice>
) {
  const isUnmountedRef = useRef(false)

  useEffect(() => {
    isUnmountedRef.current = false
    return () => {
      isUnmountedRef.current = true
    }
  }, [])

  let options: SnapshotOptions<StateSlice> | undefined
  let selector: SnapshotSelector<State, StateSlice> | undefined

  if (selectorOrOption && !isFunction(selectorOrOption)) {
    options = selectorOrOption
    selector = undefined
  } else {
    options = maybeOptions
    selector = selectorOrOption
  }

  const { sync: updateInSync, isEqual = shallowEqual } = options ?? {}

  const _subscribe = useCallback(
    (callback: SubscribeListener<State>) => subscribe(proxyState, callback, updateInSync),
    [proxyState, updateInSync]
  )

  const _getSnapshot = useCallback(() => snapshot(proxyState), [proxyState])

  const _selector = (selector || ((s) => s)) as (state: State) => StateSlice

  const _snapshot = useSyncExternalStoreWithSelector<State, StateSlice>(
    _subscribe,
    _getSnapshot,
    _getSnapshot,
    _selector,
    (a, b) => {
      if (isUnmountedRef.current) return true
      return isEqual(a, b)
    }
  )

  return _snapshot as StateSlice
}
