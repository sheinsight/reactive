import { useSnapshot } from "./use-snapshot";
import { create as createVanilla } from "../vanilla";

import type { CreateOptions } from "../vanilla";
import type { Selector, SnapshotOptions } from "./use-snapshot.js";

export const createWithHooks = <T extends object>(initState: T, options?: CreateOptions) => {
  const store = createVanilla<T>(initState, options);

  const _useSnapshot = <S = T>(s?: SnapshotOptions | Selector<T, S>, o?: SnapshotOptions) => {
    return useSnapshot<T, S>(store.mutate, s, o);
  };

  Object.assign(store, { useSnapshot: _useSnapshot });

  return store as typeof store & { useSnapshot: typeof _useSnapshot };
};
