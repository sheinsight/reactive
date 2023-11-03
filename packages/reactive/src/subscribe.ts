import { LISTENERS } from "./utils.js";

// export function subscribe<T extends object>(
//   proxyObject: T,
//   callback: () => void,
//   updateInSync = false
// ) {
//   const payload = { callback, mode: updateInSync ? "sync" : "async" };

//   (proxyObject as any)[LISTENERS].add(payload);
//   return () => {
//     (proxyObject as any)[LISTENERS].delete(payload);
//   };
// }


export function subscribe<T extends object>(
  proxyObject: T,
  callback: () => void,
  notifyInSync?: boolean
) {

  let promise: Promise<void> | undefined

  const listener = (op) => {

    if (notifyInSync) {
      callback( )
      return
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = undefined
        callback( )
      })
    }
  }
  ;(proxyObject as any)[LISTENERS].add(listener)
  return () => {
    ;(proxyObject as any)[LISTENERS].delete(listener)
  }
}
