import { SNAPSHOT } from '../utils/index.js'

/**
 * Get a snapshot of the store state.
 *
 * @param proxyState The store state.
 *
 * @since 0.1.5
 */
export function snapshot<State extends object>(proxyState: State): State {
  return (proxyState as any)[SNAPSHOT]
}

/**
 * @deprecated Use `snapshot` instead. Will be removed in the next major version.
 */
export const getSnapshot = snapshot
