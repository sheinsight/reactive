import type { VanillaStore } from '../../vanilla/create.js'

export interface WithDerivedContributes<State extends object, D extends object = State> {
  /**
   * Get the derived state.
   */
  derived: () => D
}

/**
 * 
 * Enhances a store with `derived` method that returns the derived state.
 * 
 * @param store - The store to enhance.
 * @param mapFn - The function to map the state to the derived state.
 * @returns The enhanced store.
 * 
 * @since 0.5.0
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
): Store & WithDerivedContributes<Store['mutate'], Derived> {
  return {
    ...store,
    derived: () => mapFn(store.mutate),
  }
}
