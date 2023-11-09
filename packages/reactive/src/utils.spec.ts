import { describe, it, expect } from "vitest";

import { proxy, subscribe, useSnapshot, produce } from "./utils.js";

describe("utils", () => {
  it("should be defined", () => {
    expect(proxy).toBeDefined();
    expect(subscribe).toBeDefined();
    expect(useSnapshot).toBeDefined();
    expect(produce).toBeDefined();

    expect(typeof proxy).toBe("function");
    expect(typeof subscribe).toBe("function");
    expect(typeof useSnapshot).toBe("function");
    expect(typeof produce).toBe("function");
  });
});
