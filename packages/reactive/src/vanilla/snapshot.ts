import { SNAPSHOT } from '../utils/index.js'

import type { SnapshotSelector } from '../react/use-snapshot.js'

/**
 * Get a snapshot of the store state.
 *
 * @param proxyState The store state.
 *
 * @since 0.1.5
 */
export function snapshot<State extends object, StateSlice = State>(
  proxyState: State,
  selector: SnapshotSelector<State, StateSlice> = (s) => s as unknown as StateSlice,
): StateSlice {
  return selector((proxyState as any)[SNAPSHOT])
}

/**
 * @deprecated Use `snapshot` instead. Will be removed in the next major version.
 */
export const getSnapshot = snapshot
