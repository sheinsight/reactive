import { useCallback, useRef } from "react";
import { DeepReadonly, getSnapshot } from "./utils";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";
import { createProxy, isChanged } from "proxy-compare";
import { subscribe } from "./subscribe";

export function useSnapshot<T extends object>(proxyState: T): DeepReadonly<T> {
  const affected = new WeakMap();
  const lastAffected = useRef<typeof affected>(affected);

  const _subscribe = useCallback(
    (callback: () => void) => subscribe(proxyState, callback),
    []
  );

  const _getSnapshot = useCallback(() => getSnapshot(proxyState), []);

  const snapshot = useSyncExternalStoreWithSelector(
    _subscribe,
    _getSnapshot,
    _getSnapshot,
    (snap) => snap,
    (a, b) => !isChanged(a, b, lastAffected.current, new WeakMap())
  );

  lastAffected.current = affected;

  return createProxy(snapshot, affected);
}
