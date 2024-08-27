import type { VanillaStore } from './../vanilla/create.js'

export interface WithDerivedContributes<State extends object, D extends object = State> {
  /**
   * Get the derived state.
   */
  derived: () => D
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
 * console.log(store.derived().isViki, store.derived().isNegative)
 * ```
 */
export function withDerived<Store extends VanillaStore<object>, Derived extends object = Store['mutate']>(
  store: Store,
  mapFn: (state: Store['mutate']) => Derived = (s) => s as unknown as Derived,
): WithDerivedContributes<Store['mutate'], Derived> & Store {
  return {
    ...store,
    derived: () => mapFn(store.mutate),
  }
}
