import { getSnapshot } from './get-snapshot.js'
import { proxy } from './proxy.js'

export function produce<State extends object>(obj: State, draftHandler: (draft: State) => void) {
  let state: State | null = proxy(obj)
  draftHandler(state)
  const snapshot = getSnapshot(state)
  state = null
  return snapshot as State
}
