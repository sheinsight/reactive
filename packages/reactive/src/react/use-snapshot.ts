import { useCallback } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector.js";

import { shallowEqual } from "../utils/index.js";
import { subscribe, getSnapshot, type SubscribeCallback } from "../vanilla";

export interface SnapshotOptions {
  sync?: boolean;
  isEqual?: (a: unknown, b: unknown) => boolean;
}

export type Selector<State, StateSlice> = (state: State) => StateSlice;

interface UseSnapshot {
  <State extends object, StateSlice>(state: State): State;
  <State extends object, StateSlice>(state: State, s: SnapshotOptions): State;
  <State extends object, StateSlice>(state: State, s: Selector<State, StateSlice>): StateSlice;
  <State extends object, StateSlice>(
    state: State,
    s: Selector<State, StateSlice>,
    o: SnapshotOptions
  ): StateSlice;
}

export const useSnapshot: UseSnapshot = <State extends object, StateSlice>(
  proxyState: State,
  selectorOrOption?: SnapshotOptions | Selector<State, StateSlice>,
  maybeOptions?: SnapshotOptions
) => {
  if (typeof selectorOrOption !== "function") {
    maybeOptions = selectorOrOption;
    selectorOrOption = undefined;
  }

  const { sync: updateInSync = false, isEqual = shallowEqual } = maybeOptions ?? {};

  const _subscribe = useCallback(
    (callback: SubscribeCallback<State>) => subscribe(proxyState, callback, updateInSync),
    [proxyState, updateInSync]
  );

  const _getSnapshot = useCallback(() => getSnapshot(proxyState), [proxyState]);

  const selector = (selectorOrOption || ((s) => s)) as (state: State) => StateSlice;

  const snapshot = useSyncExternalStoreWithSelector<State, StateSlice>(
    _subscribe,
    _getSnapshot,
    _getSnapshot,
    selector,
    isEqual
  );

  return snapshot;
};

// const state = useSnapshot({ name: 123 });
// const state2 = useSnapshot({ name: 123 }, (s) => s);
// const state3 = useSnapshot({ name: 123 }, (s) => s, {});
// const state4 = useSnapshot({ name: 123 }, {});
// const name = useSnapshot({ name: 123 }, (s) => s.name);
// const name2 = useSnapshot({ name: 123 }, (s) => s.name, {});
// const [name3, age] = useSnapshot({ name: "123", age: 2 }, (s) => [s.name, s.age], {});

// const { name: name4, age: age2 } = useSnapshot({ name: "123", age: 2 }, (s) => ({
//   name: s.name,
//   age: s.age,
// }));
