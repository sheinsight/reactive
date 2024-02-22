import { describe, expect, it } from "vitest";

import { createWithHooks } from "./create-with-hooks";

describe("createWithHooks", () => {
  it("should return a store with the useSnapshot function", () => {
    const initState = { count: 0 };

    const store = createWithHooks(initState);

    expect(store.useSnapshot).toBeDefined();
  });
});
