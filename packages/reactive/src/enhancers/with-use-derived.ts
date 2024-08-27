import { withDerived } from './with-derived.js'
import { useSnapshot } from '../react/use-snapshot.js'

import type { VanillaStore } from '../vanilla/index.js'
import type { SnapshotOptions } from '../react/use-snapshot.js'
import type { WithDerivedContributes } from './with-derived.js'

export interface WithUseDerivedContributes<State extends object, Derived extends object = State>
  extends WithDerivedContributes<State, Derived> {
  /**
   * Get the derived state.
   */
  useDerived: (options?: SnapshotOptions<Derived>) => Derived
}

/**
 * 
 * @example
 * 
 * ```tsx
 * const store = withDerived(
 *  create({
 *    count: 123,
 *    info: { name: 'Viki' },
 *  }),
 *  (s) => ({
 *    isViki: s.info.name === 'Viki',
 *    isNegative: s.count < 0,
 *  }),
 * )

 * // in normal JS/TS
 * console.log(store.derived().isViki)

 * // in React component
 * export function App() {
 *  const { isNegative } = store.useDerived()
 * }
 * ```
 */
export function withUseDerived<Store extends VanillaStore<object>, Derived extends object = Store['mutate']>(
  store: Store,
  mapFn: (state: Store['mutate']) => Derived = (s) => s as unknown as Derived,
): WithUseDerivedContributes<Store['mutate'], Derived> & Store {
  const storeWithDerived = withDerived<Store, Derived>(store, mapFn)

  return {
    ...storeWithDerived,
    useDerived: (options: SnapshotOptions<Derived> = {}) => {
      return useSnapshot<Store['mutate'], Derived>(store.mutate, mapFn, options)
    },
  }
}
