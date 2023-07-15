import { proxy } from "./proxy";
import { useSnapshot } from "./use-snapshot";
import { subscribe } from "./subscribe";

export function create<T extends object>(initState: T) {
  const state = proxy(initState);
  return {
    current: state,
    useSnapshot: (): T => useSnapshot(state),
    subscribe: (callback) => subscribe(state, callback),
  };
}
export { proxy, subscribe, useSnapshot };
