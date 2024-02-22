import { proxy } from "./proxy.js";
import { subscribe } from "./subscribe.js";
import { useSnapshot } from "../react/use-snapshot.js";
import { prepareDevtools } from "../devtools.js";

import type { DevtoolsOptions } from "../devtools.js";

/** initial options for creation */
export interface CreateOptions {
  // /** @deprecated place use `devtools`, `devtool` will be removed in next major version */
  // devtool?: DevtoolsOptions;
  // /** options for devtools, `name` is required */
  // devtools?: DevtoolsOptions;
}

export type ObjSelector<T> = ((state: T) => T) | (<S extends object>(state: T) => S);

export function create<T extends object>(initState: T, options?: CreateOptions) {
  const proxyState = proxy(initState);

  const restore = () => {
    const _ = structuredClone(initState);
    Object.keys(_).forEach((k) => void (proxyState[k] = _[k]));
  };

  options ??= {};

  // const devtools = options.devtools ?? options.devtool;
  // const disableDevtools = prepareDevtools(devtools, proxyState, restore);

  const _subscribe = (callback: () => void, selector: ObjSelector<T> = (s: T) => s) => {
    return subscribe(selector(proxyState), callback);
  };

  return {
    mutate: proxyState,
    subscribe: _subscribe,
    restore,
    // disableDevtools,
  };
}
