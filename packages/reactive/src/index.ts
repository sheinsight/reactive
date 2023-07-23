import { proxy } from "./proxy.js";
import { useSnapshot } from "./use-snapshot.js";
import { subscribe } from "./subscribe.js";
import { DeepReadonly } from "./utils.js";

export function create<T extends object>(
  initState: T
): Readonly<{
  mutate: T;
  useSnapshot: () => DeepReadonly<T>;
  subscribe: (callback: () => void) => () => void;
  restore: () => void;
}> {
  const state = proxy(initState);
  return {
    mutate: state,
    useSnapshot: (): DeepReadonly<T> => useSnapshot(state),
    subscribe: (callback) => subscribe(state, callback),
    restore: () => {
      const _ = structuredClone(initState);
      Object.keys(_).forEach((k) => {
        state[k] = _[k];
      });
    },
  };
}
export { proxy, subscribe, useSnapshot };
