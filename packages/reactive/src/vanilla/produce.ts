import { proxy } from './proxy.js'
import { getSnapshot } from './get-snapshot.js'

export function produce<T extends object>(obj: T, draftHandler: (draft: T) => void) {
  let state: T | null = proxy(obj)
  draftHandler(state)
  const snapshot = getSnapshot(state)
  state = null
  return snapshot as T
}
