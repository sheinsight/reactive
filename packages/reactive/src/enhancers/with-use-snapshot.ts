import { isFunction } from '../utils/index.js'
import { withSnapshot } from './with-snapshot.js'
import { useSnapshot } from '../react/use-snapshot.js'

import type { VanillaStore } from '../vanilla/create.js'
import type { StoreUseSnapshot } from '../react/create-with-hooks.js'
import type { WithSnapshotContributes } from './with-snapshot.js'
import type { SnapshotOptions, SnapshotSelector } from '../react/use-snapshot.js'

export interface WithUseSnapshotContributes<State extends object> extends WithSnapshotContributes<State> {
  /**
   * Get the snapshot of the state.
   */
  useSnapshot: StoreUseSnapshot<State>
}

/**
 * Enhances a store with a `useSnapshot` method that returns a snapshot of the store's state.
 *
 * @param store - The store to enhance.
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
 * console.log(store.useSnapshot(), store.useSnapshot((s) => s.count))
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
): WithUseSnapshotContributes<Store['mutate']> & Store {
  const storeWithSnapshot = withSnapshot<Store>(store)

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
    ...storeWithSnapshot,
    useSnapshot: boundUseSnapshot,
  }
}
