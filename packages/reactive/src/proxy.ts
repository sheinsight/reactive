import { getUntracked } from "proxy-compare";
import {
  LISTENERS,
  REACTIVE,
  SNAPSHOT,
  canProxy,
  createObjectFromPrototype,
  isObject,
  getSnapshot,
} from "./utils.js";

let globalVersion = 1;

// Cache content used to store snapshots.
const snapshotCache = new WeakMap<
  object,
  [version: number, snapshot: unknown]
>();

export function proxy<T extends object>(initState: T): T {
  let version = globalVersion;
  const listeners = new Set<(v?: number) => void>();

  // FIXME:
  // when the value is not truly changed, the listener should not be triggered.
  // such as: `state.count = state.count`
  const notifyUpdate = (nextVersion = ++globalVersion) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => {
        listener();
      });
    }
  };

  const propListenerMap = new Map<PropertyKey, () => void>();

  const getPropListener = (prop: PropertyKey) => {
    let listener = propListenerMap.get(prop);
    if (!listener) {
      listener = (nextVersion?: number) => notifyUpdate(nextVersion);
      propListenerMap.set(prop, listener);
    }
    return listener;
  };

  const popPropListener = (prop: PropertyKey) => {
    const listener = propListenerMap.get(prop);
    propListenerMap.delete(prop);
    return listener;
  };

  const createSnapshot = <T extends object>(target: T, receiver: any) => {
    // if cache exists and version is equal then return cache
    const cache = snapshotCache.get(receiver);
    if (cache?.[0] === version) {
      return cache[1];
    }

    // create snapshot by target prototype
    const snapshot = createObjectFromPrototype(target);

    snapshotCache.set(receiver, [version, snapshot]);

    Reflect.ownKeys(target).forEach((key) => {
      const value: any = Reflect.get(target, key, receiver);
      // if has REACTIVE  , this's reactive proxy object
      if (value?.[REACTIVE]) {
        // recursive create snapshot because value is reactive proxy object
        snapshot[key] = getSnapshot(value);
      } else {
        snapshot[key] = value;
      }
    });
    Object.freeze(snapshot);
    return snapshot;
  };

  // create baseObject by initState prototype
  const baseObject = createObjectFromPrototype(initState);

  const proxyState = new Proxy(baseObject, {
    get(target, prop, receiver) {
      if (prop === LISTENERS) {
        return listeners;
      }
      if (prop === SNAPSHOT) {
        // recursive create snapshot to object.freeze
        return createSnapshot(target, receiver);
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      // if current value has LISTENERS , delete child listeners
      const childListeners = Reflect.get(target, prop, receiver)?.[LISTENERS];
      if (childListeners) {
        childListeners.delete(popPropListener(prop));
      }

      let nextValue = value;

      if (isObject(value)) {
        nextValue = getUntracked(nextValue) || nextValue;
      }

      if (value?.[LISTENERS]) {
        nextValue = value;
        nextValue[LISTENERS].add(getPropListener(prop));
      } else if (canProxy(value)) {
        nextValue = proxy(value);
        nextValue[REACTIVE] = true;
        nextValue[LISTENERS].add(getPropListener(prop));
      } else {
        nextValue = value;
      }
      let success = Reflect.set(target, prop, nextValue, receiver);
      if (success) {
        notifyUpdate();
      }
      return success;
    },
    deleteProperty(target: T, prop: string | symbol) {
      const childListeners = Reflect.get(target, prop)?.[LISTENERS];
      if (childListeners) {
        childListeners.delete(popPropListener(prop));
      }
      const success = Reflect.deleteProperty(target, prop);
      if (success) {
        notifyUpdate();
      }
      return success;
    },
  });

  Reflect.ownKeys(initState).forEach((key) => {
    proxyState[key] = initState[key];
  });

  return proxyState;
}
