import { SNAPSHOT } from "../utils/index.js";

export function getSnapshot<T extends object>(proxyState: T): T {
  return proxyState[SNAPSHOT];
}
