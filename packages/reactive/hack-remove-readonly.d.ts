declare module "@shined/reactive" {
  import type { Config } from "@redux-devtools/extension";

  type DeepExpandType<T> = {
    [K in keyof T]: T[K] extends object ? DeepExpandType<T[K]> : T[K];
  };

  type CreateReturn<T extends object> = Readonly<{
    mutate: T;
    useSnapshot: (options?: SnapshotOptions) => T;
    subscribe: (callback: () => void) => () => void;
    restore: () => void;
  }>;

  /** redux devtool options, if set, will enable redux devtool */
  type DevtoolOptions = DeepExpandType<
    {
      name: string;
      /**
       * if set to true, will enable forever whenever production or not
       * @default false
       * */
      forceEnable?: boolean;
    } & Config
  >;

  /** initial options for creation */
  interface CreateOptions {
    devtool?: DevtoolOptions;
  }

  interface SnapshotOptions {
    sync?: boolean;
  }

  function create<T extends object>(initState: T, options?: CreateOptions): CreateReturn<T>;

  export { type CreateOptions, type CreateReturn, type DevtoolOptions, create };
}

declare module "@shined/reactive/utils" {
  interface SnapshotOptions {
    sync?: boolean;
  }

  interface ProxyOptions {
    deepFreeze?: boolean;
  }

  function ref<T extends object>(obj: T): T;
  function proxy<T extends object>(initState: T, options?: ProxyOptions): T;
  function subscribe<T extends object>(proxyObject: T, callback: () => void): () => void;
  function useSnapshot<T extends object>(proxyState: T, options?: SnapshotOptions): T;

  export { proxy, ref, subscribe, useSnapshot };
}
