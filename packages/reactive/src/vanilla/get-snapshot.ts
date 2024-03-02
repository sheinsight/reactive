import { SNAPSHOT } from '../utils/index.js'

export function getSnapshot<State extends object>(proxyState: State): State {
  return (proxyState as any)[SNAPSHOT]
}
