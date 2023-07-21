import { proxy } from "./proxy.js";
import { useSnapshot } from "./use-snapshot.js";
import { subscribe } from "./subscribe.js";
import { DeepReadonly } from "./utils.js";

export function create<T extends object>(initState: T) {
  const state = proxy(initState);
  return {
    current: state,
    useSnapshot: (): DeepReadonly<T> => useSnapshot(state),
    subscribe: (callback) => subscribe(state, callback),
  };
}
export { proxy, subscribe, useSnapshot };
