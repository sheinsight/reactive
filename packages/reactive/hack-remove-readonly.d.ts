declare module "@shined/reactive" {
  import { Config } from "@redux-devtools/extension";

  function proxy<T extends object>(initState: T): T;

  type DeepExpandType<T> = {
    [K in keyof T]: T[K] extends object ? DeepExpandType<T[K]> : T[K];
  };

  function useSnapshot<T extends object>(proxyState: T): T;

  function subscribe<T extends object>(
    proxyObject: T,
    callback: () => void
  ): () => void;

  type CreateReturn<T extends object> = Readonly<{
    mutate: T;
    useSnapshot: () => T;
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

  function create<T extends object>(
    initState: T,
    options?: CreateOptions
  ): CreateReturn<T>;

  export {
    CreateOptions,
    CreateReturn,
    DevtoolOptions,
    create,
    proxy,
    subscribe,
    useSnapshot,
  };
}
