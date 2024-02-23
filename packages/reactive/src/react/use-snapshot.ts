import { useCallback } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector.js";

import { shallowEqual } from "../utils/index.js";
import { subscribe, getSnapshot, type SubscribeCallback } from "../vanilla";

export interface SnapshotOptions {
  sync?: boolean;
  isEqual?: (a: unknown, b: unknown) => boolean;
}

export type Selector<State, StateSlice> = (state: State) => State | StateSlice;

export function useSnapshot<State extends object, StateSlice = State>(
  proxyState: State,
  selectorOrOption?: SnapshotOptions | Selector<State, StateSlice>,
  maybeOptions?: SnapshotOptions
): StateSlice {
  if (typeof selectorOrOption !== "function") {
    maybeOptions = selectorOrOption;
    selectorOrOption = (s: State) => s;
  }

  const { sync: updateInSync = false, isEqual = shallowEqual } = maybeOptions || {};

  const _subscribe = useCallback(
    (callback: SubscribeCallback<State>) => subscribe(proxyState, callback, updateInSync),
    [proxyState, updateInSync]
  );

  const _getSnapshot = useCallback(() => getSnapshot(proxyState), [proxyState]);

  const snapshot = useSyncExternalStoreWithSelector(
    _subscribe,
    _getSnapshot,
    _getSnapshot,
    selectorOrOption,
    isEqual
  );

  return snapshot as StateSlice;
}
