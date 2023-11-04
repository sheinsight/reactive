import { ORIGINAL } from "./utils.js";

export function original<T>(object: T) {
  return object[ORIGINAL]?.();
}
