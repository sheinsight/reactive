import { snapshot } from '../../vanilla/snapshot.js'

import type { SnapshotSelector } from '../../react/use-snapshot.js'
import type { VanillaStore } from '../../vanilla/create.js'

export interface WithSnapshotContributes<State extends object> {
  /**
   * Get the snapshot of the state.
   */
  snapshot: <StateSlice = State>(selector?: SnapshotSelector<State, StateSlice>) => StateSlice
}

/**
 * Enhances a store with a `snapshot` method that returns a snapshot of the store's state.
 *
 * @param store - The store to enhance.
 * @returns The enhanced store.
 *
 * @since 0.2.0
 *
 * @example
 *
 * ```tsx
 * const store = withSnapshot(
 *   createVanilla({
 *     count: 123,
 *     info: { name: 'Viki' },
 *   }),
 * )
 *
 * // in normal JS/TS
 * console.log(store.snapshot(), store.snapshot((s) => s.count))
 * ```
 */
export function withSnapshot<Store extends VanillaStore<object>>(
  store: Store,
): Store & WithSnapshotContributes<Store['mutate']> {
  const _snapshot = <StateSlice = Store>(
    selector: SnapshotSelector<Store['mutate'], StateSlice> = (s) => s as unknown as StateSlice,
  ) => {
    return snapshot(store.mutate, selector) as StateSlice
  }

  return {
    ...store,
    snapshot: _snapshot,
  }
}
