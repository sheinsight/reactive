import { ref } from "./ref.js";
import { proxy } from "./proxy.js";
import { subscribe } from "./subscribe.js";
import { useSnapshot } from "./use-snapshot.js";
import { isProduction } from "./internal-utils.js";
import { enableDevtool } from "./devtool.js";

import type { Config as ReduxDevtoolConfig } from "@redux-devtools/extension";
import type { DeepReadonly, DeepExpandType } from "./internal-utils.js";
import type { SnapshotOptions } from "./use-snapshot.js";

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

export type CreateReturn<T extends object> = Readonly<{
  mutate: T;
  useSnapshot: (options?: SnapshotOptions) => DeepReadonly<T>;
  subscribe: (callback: () => void) => () => void;
  restore: () => void;
}>;

function create<T extends object>(initState: T, options?: CreateOptions): CreateReturn<T> {
  const state = proxy(initState);

  const restore = () => {
    const _ = structuredClone(initState);
    Object.keys(_).forEach((k) => {
      state[k] = _[k];
    });
  };

  let disableDevtool: false | (() => void) = () => {};

  if (options?.devtool) {
    if (!options?.devtool.name) {
      throw new Error("devtool.name is required");
    }

    const isForceEnable = !!options?.devtool?.forceEnable;

    if (!isProduction || isForceEnable) {
      disableDevtool = enableDevtool(state, options.devtool, restore);
    }
  }

  return {
    mutate: state,
    useSnapshot: (options): DeepReadonly<T> => useSnapshot(state, options),
    subscribe: (callback) => subscribe(state, callback),
    restore,
  };
}

export { create, ref };
