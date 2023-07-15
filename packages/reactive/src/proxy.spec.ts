import { proxy } from "./proxy";
import { describe, it, expect } from "vitest";
import { LISTENERS } from "./utils";

describe("proxy", () => {
  it("should be defined", () => {
    expect(proxy).toBeDefined();
  });
  it("should initial listeners", () => {
    const proxyState = proxy({
      name: "Pikachu",
      address: {
        city: "NanJing",
      },
    });
    expect(proxyState[LISTENERS]).toBeDefined();
    expect(proxyState[LISTENERS].size).toEqual(0);
  });
});
