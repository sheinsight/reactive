import { LISTENERS } from "../utils/index.js";

export function subscribe<T extends object>(
  proxyObject: T,
  callback: () => void,
  notifyInSync?: boolean
) {
  let promise: Promise<void> | undefined;

  const listener = () => {
    if (notifyInSync) {
      return void callback();
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
