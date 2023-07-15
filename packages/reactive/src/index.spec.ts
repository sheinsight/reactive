import { describe, it, expect } from "vitest";
import { create } from "./index";

describe("index", () => {
  it("should be defined", () => {
    expect(create).toBeDefined();
  });
  it("should be return current , useSnapshot and subscribe by current state", () => {
    const store = create({
      name: "Pikachu",
      address: {
        city: "NanJing",
      },
    });
    expect(store.current).toBeDefined();
    expect(store.useSnapshot).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });
});
