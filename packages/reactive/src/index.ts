import { proxy } from "./proxy.js";
import { useSnapshot } from "./use-snapshot.js";
import { subscribe } from "./subscribe.js";
import { enableDevtool } from "./devtool.js";
import { isProduction } from "./utils.js";

import type { Config as ReduxDevtoolConfig } from "@redux-devtools/extension";
import type { DeepReadonly, DeepExpandType } from "./utils.js";

export type CreateReturn<T extends object> = Readonly<{
  mutate: T;
  useSnapshot: () => DeepReadonly<T>;
  subscribe: (callback: () => void) => () => void;
  restore: () => void;
}>;

/** redux devtool options, if set, will enable redux devtool */
export type DevtoolOptions = DeepExpandType<
  {
    /* name of the store, will be displayed as title in devtool switch panel */
    name: string;
    /**
     * if set to true, will enable forever whenever production or not
     * @default false
     * */
    forceEnable?: boolean;
  } & ReduxDevtoolConfig
>;

/** initial options for creation */
export interface CreateOptions {
  devtool?: DevtoolOptions;
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

    if (!isProduction || options?.devtool?.forceEnable) {
      const disableDevtool = enableDevtool(state, options.devtool, restore);
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
