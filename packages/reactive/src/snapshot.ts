import { SNAPSHOT } from "./internal-utils.js";

export function getSnapshot<T extends object>(proxyState: T): T {
  return proxyState[SNAPSHOT];
}
