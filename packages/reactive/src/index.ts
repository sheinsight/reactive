export {
  ref,
  devtools,
  subscribe,
  produce,
  /**
   * @since 0.3.0
   */
  setGlobalNotifyInSync,
  /**
   * @since 0.2.0
   */
  snapshot,
  /**
   * @since 0.2.0
   */
  createVanilla,
  /**
   * @since 0.3.1
   */
  proxyCount,
  /**
   * @deprecated Use `snapshot` instead. Will be removed in the next major version.
   */
  getSnapshot,
} from './vanilla/index.js'

export {
  /**
   * Create a store with React hooks. If you are in a Vanilla JavaScript environment, consider using [createVanilla](https://sheinsight.github.io/reactive/zh-cn/reference/basic/create-vanilla.html) instead.
   *
   * 创建一个带有 React hooks 的 store。如果你在 Vanilla JavaScript 环境中使用 store，请考虑使用 [createVanilla](https://sheinsight.github.io/reactive/zh-cn/reference/basic/create-vanilla.html) 替代。
   *
   * @link https://sheinsight.github.io/reactive/reference/basic/create.html
   *
   * @example
   *
   * ```tsx
   * import { create } from '@shined/reactive'
   *
   * const store = create({ count: 0 })
   *
   * function increaseCount() {
   *   store.mutate.count++
   * }
   *
   * function Counter() {
   *   const count = store.useSnapshot(s => s.count)
   *   return <button onClick={increaseCount}>Count is {count}</button>
   * }
   */
  createWithHooks as create,
  /**
   * @since 0.2.0
   */
  useReactive,
  /**
   * @since 0.2.0
   */
  useSnapshot,
  /**
   * @since 0.2.0
   */
  useSubscribe,
} from './react/index.js'

export * from './enhancers/index.js'

export type * from './vanilla/index.js'
export type * from './react/index.js'
export type * from './utils/index.js'
export type * from './enhancers/index.js'
