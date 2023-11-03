import { useEffect, useRef } from "react";

import { subscribe } from "./subscribe.js";

import { REACTIVE } from "./utils.js";

export interface UseSubscribeOptions {
  sync?: boolean;
  deps?: any[];
}

export function useSubscribe(callback: any, options: UseSubscribeOptions) {
  if (options.deps[REACTIVE]) {
    throw new Error(`can't use reactive store as dependency , must be primitive array.`);
  }

  const ref = useRef(null);

  ref.current = callback;

  useEffect(() => {
    let unsubscribes = [];
    options.deps.forEach((dep) => {
      if (!dep[REACTIVE]) {
        throw new Error("useSubscribe must be used on reactive store.");
      }
      unsubscribes.push(subscribe(dep, () => ref.current(), options.sync ?? false));
    });
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, []);
}
