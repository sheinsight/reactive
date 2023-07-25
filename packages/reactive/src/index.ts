import { Config as ReduxDevtoolConfig } from "@redux-devtools/extension";

import { proxy } from "./proxy.js";
import { useSnapshot } from "./use-snapshot.js";
import { subscribe } from "./subscribe.js";
import { DeepReadonly } from "./utils.js";
import { enableDevtool } from "./devtool.js";

export type CreateReturn<T extends object> = Readonly<{
  mutate: T;
  useSnapshot: () => DeepReadonly<T>;
  subscribe: (callback: () => void) => () => void;
  restore: () => void;
}>;

/** initial options for creation */
export interface CreateOptions extends ReduxDevtoolConfig {
  /** devtool options, if set, will enable redux devtool */
  devtool?: {
    /**
     * name of the store, will be displayed in devtool panel
     */
    name: string;
    /**
     * if set to true, will enable forever whenever production or not
     * @default false
     * */
    forceEnable?: boolean;
  };
}

export function create<T extends object>(
  initState: T,
  options?: CreateOptions
): CreateReturn<T> {
  const state = proxy(initState);

  const restore = () => {
    const _ = structuredClone(initState);
    Object.keys(_).forEach((k) => {
      state[k] = _[k];
    });
  };

  if (options?.devtool) {
    if (!options?.devtool.name) {
      throw new Error("devtool.name is required");
    }

    // FIXME: need to be implemented
    const isProduction = false;

    if (!isProduction || options?.devtool?.forceEnable) {
      const disableDevtool = enableDevtool(state, options, restore);
    }
  }

  return {
    mutate: state,
    useSnapshot: (): DeepReadonly<T> => useSnapshot(state),
    subscribe: (callback) => subscribe(state, callback),
    restore,
  };
}

export { proxy, subscribe, useSnapshot };
