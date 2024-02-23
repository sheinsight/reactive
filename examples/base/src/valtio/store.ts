import { proxy, useSnapshot } from "valtio";
import { devtools } from "valtio/utils";

export const store = (() => {
  const state = proxy({
    obj: {
      name: 123,
      info: {
        age: 18,
      },
    },
  });

  return {
    mutate: state,
    useSnapshot: () => useSnapshot(state),
  };
})();

devtools(store.mutate, { name: "state name", enabled: true });
