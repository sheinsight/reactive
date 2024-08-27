export {
  ref,
  devtools,
  subscribe,
  snapshot,
  produce,
  /**
   * @deprecated Use `snapshot` instead. Will be removed in the next major version.
   */
  getSnapshot,
} from './vanilla/index.js'

export {
  createWithHooks as create,
  useReactive,
} from './react/index.js'

export type * from './vanilla/index.js'
export type * from './react/index.js'
export type * from './utils/index.js'
