import { SNAPSHOT } from '../utils/index.js'

export type SnapshotSelector<State, StateSlice> = (state: State) => StateSlice

/**
 * Get a snapshot of the store state.
 *
 * @param proxyState The store state.
 *
 * @since 0.2.0
 */
export function snapshot<State extends object, StateSlice = State>(
  proxyState: State,
  selector: SnapshotSelector<State, StateSlice> = (s) => s as unknown as StateSlice
): StateSlice {
  return selector((proxyState as any)[SNAPSHOT])
}

/**
 * @deprecated Use `snapshot` instead. Will be removed in the next major version.
 */
export const getSnapshot = snapshot
