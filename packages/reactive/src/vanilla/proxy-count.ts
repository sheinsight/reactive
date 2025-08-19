import { PROXY_COUNT } from '../utils'

/**
 * Count the number of proxies in a reactive state.
 *
 * @since 0.3.1
 *
 * @example
 *
 * ```ts
 * import { create, proxyCount } from '@shined/reactive'
 *
 * const store = create({ count: 0. obj: { a: 1 } })
 * const count = proxyCount(store.mutate) // 1
 *
 * store.mutate.obj.b = { c: 2 }
 * const count2 = proxyCount(store.mutate) // 2
 * const count3 = proxyCount(store.mutate.obj) // 1
 * const count4 = proxyCount(store.mutate.obj.b) // 0
 *
 * delete store.mutate.obj
 * const count5 = proxyCount(store.mutate) // 0
 */
export function proxyCount<State extends object>(proxyState: State): number {
  return (proxyState as any)?.[PROXY_COUNT] ?? 0
}
