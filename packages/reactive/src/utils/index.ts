import { hasRef } from "../vanilla/ref.js";

export type DeepExpandType<T> = {
  [K in keyof T]: T[K] extends object ? DeepExpandType<T[K]> : T[K];
};

export const SNAPSHOT = Symbol("SNAPSHOT");
export const LISTENERS = Symbol("LISTENERS");
export const REACTIVE = Symbol("REACTIVE");

export const isProduction = process.env.NODE_ENV === "production";
export const REACTIVE_STORE_CHANGED = "REACTIVE_STORE_CHANGED";

export const hasOwn = Object.prototype.hasOwnProperty;
export const isObject = (x: unknown): x is object => typeof x === "object" && x !== null;

export const createObjectFromPrototype = <T extends object>(target: T): T => {
  return Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
};

export const canProxy = (x: unknown) =>
  isObject(x) &&
  !hasRef(x) &&
  (Array.isArray(x) || !(Symbol.iterator in x)) &&
  !(x instanceof WeakMap) &&
  !(x instanceof WeakSet) &&
  !(x instanceof Error) &&
  !(x instanceof Number) &&
  !(x instanceof Date) &&
  !(x instanceof String) &&
  !(x instanceof RegExp) &&
  !(x instanceof ArrayBuffer);

export const shallowEqual = <T>(objA: T, objB: T) => {
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
};
