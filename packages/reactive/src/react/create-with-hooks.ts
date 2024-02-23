import { useSnapshot } from "./use-snapshot";
import { create as createVanilla } from "../vanilla";

import type { CreateOptions } from "../vanilla";
import type { Selector, SnapshotOptions } from "./use-snapshot.js";

interface StoreUseSnapshot<State extends object> {
  <StateSlice>(): State;
  <StateSlice>(s: SnapshotOptions): State;
  <StateSlice>(s: Selector<State, StateSlice>): StateSlice;
  <StateSlice>(s: Selector<State, StateSlice>, o: SnapshotOptions): StateSlice;
}

export const createWithHooks = <State extends object>(
  initState: State,
  options?: CreateOptions
) => {
  const store = createVanilla(initState, options);

  const _useSnapshot: StoreUseSnapshot<State> = <StateSlice>(
    selectorOrOption?: SnapshotOptions | Selector<State, StateSlice>,
    maybeOptions?: SnapshotOptions
  ) => {
    if (selectorOrOption === undefined) return useSnapshot(store.mutate);
    if (typeof selectorOrOption === "function") return useSnapshot(store.mutate, selectorOrOption);
    if (typeof selectorOrOption === "object") return useSnapshot(store.mutate, selectorOrOption);
    if (maybeOptions === undefined) return useSnapshot(store.mutate, selectorOrOption);
    return useSnapshot(store.mutate, selectorOrOption, maybeOptions);
  };

  Object.assign(store, { useSnapshot: _useSnapshot });

  return store as typeof store & { useSnapshot: typeof _useSnapshot };
};

// const store = createWithHooks({ name: "123", age: 2 });

// const state = store.useSnapshot();
// const state2 = store.useSnapshot((s) => s);
// const state3 = store.useSnapshot((s) => s, {});
// const state4 = store.useSnapshot({});
// const name = store.useSnapshot((s) => s.name);
// const name2 = store.useSnapshot((s) => s.name, {});

// const [name3, age] = store.useSnapshot((s) => [s.name, s.age], {});

// const { name: name4, age: age2 } = store.useSnapshot((s) => ({
//   name: s.name,
//   age: s.age,
// }));
