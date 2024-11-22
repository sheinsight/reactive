import { useSnapshot } from '../../react/use-snapshot.js'
import { isFunction } from '../../utils/index.js'

import type { StoreUseSnapshot } from '../../react/create-with-hooks.js'
import type { SnapshotOptions, SnapshotSelector } from '../../react/use-snapshot.js'
import type { VanillaStore } from '../../vanilla/create.js'

export interface WithUseSnapshotContributes<State extends object> {
  /**
   * Get the snapshot of the state.
   */
  useSnapshot: StoreUseSnapshot<State>
}

/**
 * Enhances a store with `useSnapshot` method that returns a snapshot of the store's state.
 *
 * @param store - The store to enhance.
 * @returns The enhanced store.
 *
 * @since 0.2.0
 *
 * @example
 *
 * ```tsx
 * const store = withUseSnapshot(
 *   createVanilla({
 *     count: 123,
 *     info: { name: 'Viki' },
 *   }),
 * )
 *
 * // in normal JS/TS
 * console.log(store.snapshot(), store.snapshot((s) => s.count))
 *
 * // in React component
 * export function App() {
 *   const { count } = store.useSnapshot()
 *   const count = store.useSnapshot((s) => s.count)
 * }
 *
 * ```
 */
export function withUseSnapshot<Store extends VanillaStore<object>>(
  store: Store,
): Store & WithUseSnapshotContributes<Store['mutate']> {
  const boundUseSnapshot: StoreUseSnapshot<Store['mutate']> = <StateSlice>(
    selectorOrOption?: SnapshotOptions<StateSlice> | SnapshotSelector<Store['mutate'], StateSlice> | undefined,
    maybeOptions?: SnapshotOptions<StateSlice>,
  ) => {
    let options: SnapshotOptions<StateSlice> | undefined
    let selector: SnapshotSelector<Store['mutate'], StateSlice> | undefined

    if (selectorOrOption && !isFunction(selectorOrOption)) {
      options = selectorOrOption
      selector = undefined
    } else {
      options = maybeOptions
      selector = selectorOrOption
    }

    return useSnapshot(store.mutate, selector, options)
  }

  return {
    ...store,
    useSnapshot: boundUseSnapshot,
  }
}
