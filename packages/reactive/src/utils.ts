import { proxy } from "./proxy.js";
import { produce } from "./produce.js";
import { subscribe } from "./subscribe.js";
import { useSnapshot } from "./use-snapshot.js";

export { proxy, subscribe, useSnapshot, produce };

const hasOwn = Object.prototype.hasOwnProperty;

export function shallowEqual<T>(objA: T, objB: T) {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;

    for (const [key, value] of objA) {
      if (!Object.is(value, objB.get(key))) {
        return false;
      }
    }
    return true;
  }

  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;

    for (const value of objA) {
      if (!objB.has(value)) {
        return false;
      }
    }

    return true;
  }

  const keysA = Object.keys(objA);

  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwn.call(objB, keysA[i] as string) ||
      !Object.is(objA[keysA[i] as keyof T], objB[keysA[i] as keyof T])
    ) {
      return false;
    }
  }
  return true;
}
