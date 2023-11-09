import { describe, it, expect, vitest } from "vitest";

import { subscribe } from "./subscribe.js";
import { LISTENERS } from "./internal-utils.js";

describe("subscribe", () => {
  it("should add a listener to proxyObject", () => {
    const proxyObject = { [LISTENERS]: new Set() } as any;
    const callback = vitest.fn();

    const unsubscribe = subscribe(proxyObject, callback);
    expect(proxyObject[LISTENERS].size).toBe(1);

    unsubscribe();
    expect(proxyObject[LISTENERS].size).toBe(0);
  });
});
