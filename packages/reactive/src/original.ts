import { ORIGINAL } from "./utils.js";

/** @deprecated */
export function original<T>(object: T) {
  return object[ORIGINAL]?.() as T;
}
