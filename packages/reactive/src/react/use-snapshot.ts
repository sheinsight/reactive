import { useCallback } from 'react'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

import { shallowEqual } from '../utils/index.js'
import { subscribe, getSnapshot } from '../vanilla'

import type { SubscribeCallback } from '../vanilla'

export interface SnapshotOptions<StateSlice> {
  /**
   * If `true`, the snapshot will be updated in sync with the store.
   */
  sync?: boolean
  /**
   * Custom equality function to compare the previous and next state slices.
   */
  isEqual?: (a: StateSlice, b: StateSlice) => boolean
}

export type Selector<State, StateSlice> = (state: State) => StateSlice

/**
 * Returns a snapshot of the store state.
 */
export function useSnapshot<State extends object>(state: State): State
export function useSnapshot<State extends object>(
  state: State,
  options: SnapshotOptions<State>
): State
export function useSnapshot<State extends object, StateSlice>(
  state: State,
  selector: Selector<State, StateSlice>
): StateSlice
export function useSnapshot<State extends object, StateSlice>(
  state: State,
  selector: undefined,
  options: SnapshotOptions<StateSlice>
): State
export function useSnapshot<State extends object, StateSlice>(
  state: State,
  selector?: Selector<State, StateSlice>,
  options?: SnapshotOptions<StateSlice>
): StateSlice
export function useSnapshot<State extends object, StateSlice>(
  proxyState: State,
  selectorOrOption?: SnapshotOptions<StateSlice> | Selector<State, StateSlice>,
  maybeOptions?: SnapshotOptions<StateSlice>
) {
  let options: SnapshotOptions<StateSlice> | undefined
  let selector: Selector<State, StateSlice> | undefined

  if (selectorOrOption && typeof selectorOrOption !== 'function') {
    options = selectorOrOption
    selector = undefined
  } else {
    options = maybeOptions
    selector = selectorOrOption
  }

  const { sync: updateInSync = false, isEqual = shallowEqual } = options ?? {}

  const _subscribe = useCallback(
    (callback: SubscribeCallback<State>) => subscribe(proxyState, callback, updateInSync),
    [proxyState, updateInSync]
  )

  const _getSnapshot = useCallback(() => getSnapshot(proxyState), [proxyState])

  const _selector = (selector || ((s) => s)) as (state: State) => StateSlice

  const snapshot = useSyncExternalStoreWithSelector<State, StateSlice>(
    _subscribe,
    _getSnapshot,
    _getSnapshot,
    _selector,
    isEqual
  )

  return snapshot as StateSlice
}
