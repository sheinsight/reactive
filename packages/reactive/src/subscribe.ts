import { LISTENERS } from "./utils";

export function subscribe<T extends object>(
  proxyObject: T,
  callback: () => void
) {
  (proxyObject as any)[LISTENERS].add(callback);
  return () => {
    (proxyObject as any)[LISTENERS].delete(callback);
  };
}
