import { proxy } from "./proxy";
import { useSnapshot } from "./use-snapshot";
import { subscribe } from "./subscribe";
import { DeepReadonly } from "./utils";

export function create<T extends object>(initState: T) {
  const state = proxy(initState);
  return {
    current: state,
    useSnapshot: (): DeepReadonly<T> => useSnapshot(state),
    subscribe: (callback) => subscribe(state, callback),
  };
}
export { proxy, subscribe, useSnapshot };
