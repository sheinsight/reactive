import { proxy } from "./proxy.js";
import { getSnapshot } from "./get-snapshot.js";

export function produce<T extends object>(obj: T, handler: (draft: T) => void) {
  let state = proxy(obj);
  handler(state);
  const snapshot = getSnapshot(state) as T;
  state = null;
  return snapshot;
}
