import { subscribe } from "./subscribe";
import { LISTENERS } from "./utils";
import { describe, it, expect, vitest } from "vitest";

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
