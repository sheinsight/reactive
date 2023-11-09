import { proxy } from "./proxy.js";
import { getSnapshot } from "./snapshot.js";

import type { DeepReadonly } from "./internal-utils.js";

export function produce<T extends object>(obj: T, handler: (draft: T) => void) {
  let state = proxy(obj, { deepFreeze: true });

  handler(state);

  const snapshot = getSnapshot(state) as DeepReadonly<T>;

  state = null;

  return snapshot;
}
