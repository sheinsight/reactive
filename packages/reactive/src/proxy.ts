import { getUntracked } from "proxy-compare";

import {
  LISTENERS,
  REACTIVE,
  SNAPSHOT,
  canProxy,
  createObjectFromPrototype,
  isObject,
} from "./internal-utils.js";
import { hasRef } from "./ref.js";
import { getSnapshot } from "./snapshot.js";

let globalVersion = 1;

// Cache content used to store snapshots.
const snapshotCache = new WeakMap<object, [version: number, snapshot: unknown]>();

type Listener = (v?: number) => void;

export function proxy<T extends object>(initState: T): T {
  let version = globalVersion;
  const listeners = new Set<Listener>();

  const notifyUpdate = (nextVersion = ++globalVersion) => {
    if (version !== nextVersion) {
      version = nextVersion;

      listeners.forEach((callback) => {
        callback();
      });
    }
  };

  const propListenerMap = new Map<PropertyKey, Listener>();

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
    if (cache?.[0] === version) return cache[1];

    // create snapshot by target prototype
    const snapshot = createObjectFromPrototype(target);
    // markToTrack(snapshot, true); // mark to track
    snapshotCache.set(receiver, [version, snapshot]);

    Reflect.ownKeys(target).forEach((key) => {
      if (key === REACTIVE) return;

      const value: any = Reflect.get(target, key, receiver);

      if (hasRef(value)) {
        // markToTrack(value, false); // mark not to track
        snapshot[key] = value;
      } else if (value?.[REACTIVE]) {
        // if it already has REACTIVE symbol, it's a reactive proxy object, recursively create snapshot
        snapshot[key] = getSnapshot(value);
      } else {
        snapshot[key] = value;
      }
    });

    // Object.freeze(snapshot);
    Object.preventExtensions(snapshot);

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
        // handle reference type
        nextValue = getUntracked(nextValue) || nextValue;
      } else {
        // handle basic type
        const preValue = Reflect.get(target, prop, receiver);

        if (Object.is(preValue, value)) {
          return true;
        }
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
      success && notifyUpdate();
      return success;
    },
    deleteProperty(target: T, prop: string | symbol) {
      const childListeners = Reflect.get(target, prop)?.[LISTENERS];
      childListeners && childListeners.delete(popPropListener(prop));
      const success = Reflect.deleteProperty(target, prop);
      success && notifyUpdate();
      return success;
    },
  });

  Reflect.ownKeys(initState).forEach((key) => {
    proxyState[key] = initState[key];
  });

  return proxyState;
}
