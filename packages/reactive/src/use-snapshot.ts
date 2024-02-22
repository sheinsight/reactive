import { useCallback, useRef } from "react";
// import { createProxy, isChanged } from "proxy-compare";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector.js";

import { subscribe } from "./subscribe.js";
import { getSnapshot } from "./snapshot.js";

export interface SnapshotOptions {
  sync?: boolean;
}

// const globalTargetCache = new WeakMap<object, unknown>();
// const globalProxyCache = new WeakMap<object, unknown>();

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

  const { sync: updateInSync = false } = maybeOptions || {};
  // const affected = new WeakMap();
  // const lastAffected = useRef<typeof affected>(affected);

  const _subscribe = useCallback(
    (callback: () => void) => subscribe(proxyState, callback, updateInSync),
    [proxyState, updateInSync]
  );

  const _getSnapshot = useCallback(() => getSnapshot(proxyState), [proxyState]);

  const snapshot = useSyncExternalStoreWithSelector(
    _subscribe,
    _getSnapshot,
    _getSnapshot,
    selectorOrOption,
    (a, b) => {
      /**
       *  disable rendering optimization temporarily to avoid render issue caused by `proxy-compare`
       *  @see https://github.com/dai-shi/proxy-compare/issues/65
       */
      return false;

      // return !isChanged(a, b, lastAffected.current, new WeakMap());
    }
  );

  // lastAffected.current = affected;

  // return createProxy(snapshot, affected, globalProxyCache, globalTargetCache);

  return snapshot as StateSlice;
}
