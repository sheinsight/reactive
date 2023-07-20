import { describe, it, expect } from "vitest";
import { create, proxy, subscribe, useSnapshot } from "./index";

describe("index", () => {
  it("create, proxy, useSnapshot and subscribe should be defined", () => {
    expect(create).toBeDefined();

    expect(proxy).toBeDefined();
    expect(subscribe).toBeDefined();
    expect(useSnapshot).toBeDefined();
  });

  it("should be return current, useSnapshot and subscribe by current state", () => {
    const store = create({
      name: "Pikachu",
      address: {
        city: "NanJing",
      },
    });

    expect(store.current).toMatchObject({
      name: "Pikachu",
      address: {
        city: "NanJing",
      },
    });

    expect(store.useSnapshot).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });
});
