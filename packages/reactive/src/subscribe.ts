import { LISTENERS } from "./internal-utils.js";

export function subscribe<T extends object>(
  proxyObject: T,
  callback: () => void,
  notifyInSync?: boolean
) {
  let promise: Promise<void> | undefined;

  const listener = (op) => {
    if (notifyInSync) {
      callback();
      return;
    }

    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = undefined;
        callback();
      });
    }
  };

  proxyObject[LISTENERS].add(listener);

  return () => {
    proxyObject[LISTENERS].delete(listener);
  };
}
