import { ref } from "./ref.js";
import { proxy } from "./proxy.js";
import { subscribe } from "./subscribe.js";
import { useSnapshot } from "./use-snapshot.js";
import { prepareDevtools } from "./devtools.js";

import type { DevtoolsOptions } from "./devtools.js";
import type { SnapshotOptions } from "./use-snapshot.js";

/** initial options for creation */
export interface CreateOptions {
  /** @deprecated place use `devtools`, `devtool` will be removed in next major version */
  devtool?: DevtoolsOptions;
  /** options for devtools, `name` is required */
  devtools?: DevtoolsOptions;
}

function create<T extends object>(initState: T, options?: CreateOptions) {
  const proxyState = proxy(initState);

  const restore = () => {
    const _ = structuredClone(initState);
    Object.keys(_).forEach((k) => void (proxyState[k] = _[k]));
  };

  options ??= {};
  const devtools = options.devtools ?? options.devtool;
  const disableDevtools = prepareDevtools(devtools, proxyState, restore);

  return {
    mutate: proxyState,
    useSnapshot: (options?: SnapshotOptions): T => useSnapshot(proxyState, options),
    subscribe: (callback: () => void) => subscribe(proxyState, callback),
    restore,
    disableDevtools,
  };
}

export { create, ref };
