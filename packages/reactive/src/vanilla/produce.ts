import { proxy } from './proxy.js'
import { snapshot } from './snapshot.js'

export function produce<State extends object>(obj: State, draftHandler: (draft: State) => void) {
  let state: State | null = proxy(obj)
  draftHandler(state)
  const nextSnapshot = snapshot(state)
  state = null
  return nextSnapshot as State
}
