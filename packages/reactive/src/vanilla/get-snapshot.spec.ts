import { describe, it, expect } from "vitest";

import { SNAPSHOT } from "../utils/index.js";
import { getSnapshot } from "./get-snapshot.js";

describe("getSnapshot", () => {
  it("should get snapshot from proxyState", () => {
    const proxyState = { [SNAPSHOT]: "snapshot" } as any;
    expect(getSnapshot(proxyState)).toBe("snapshot");
  });

  it("should return undefined if no snapshot", () => {
    const proxyState = {} as any;
    expect(getSnapshot(proxyState)).toBeUndefined();
  });
});
