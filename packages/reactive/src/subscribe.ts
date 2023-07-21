import { LISTENERS } from "./utils.js";

export function subscribe<T extends object>(
  proxyObject: T,
  callback: () => void
) {
  (proxyObject as any)[LISTENERS].add(callback);
  return () => {
    (proxyObject as any)[LISTENERS].delete(callback);
  };
}
