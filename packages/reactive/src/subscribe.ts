import { LISTENERS } from "./utils.js";

export function subscribe<T extends object>(
  proxyObject: T,
  callback: () => void,
  updateInSync = false
) {
  const payload = { callback, mode: updateInSync ? "sync" : "async" };

  (proxyObject as any)[LISTENERS].add(payload);
  return () => {
    (proxyObject as any)[LISTENERS].delete(payload);
  };
}
