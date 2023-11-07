import { describe, it, expect, vitest } from "vitest";
import { renderHook } from "@testing-library/react-hooks/dom";

import { create, proxy, subscribe, useSnapshot } from "./index.js";
import { getSnapshot } from "./utils.js";

const runMacroTask = (fn: Function) => setTimeout(fn, 0);

describe("index", () => {
  it("create, proxy, useSnapshot and subscribe should be defined", () => {
    expect(create).toBeDefined();

    expect(proxy).toBeDefined();
    expect(subscribe).toBeDefined();
    expect(useSnapshot).toBeDefined();
  });

  it("should return mutate, useSnapshot and subscribe by current state", () => {
    const store = create({
      name: "Pikachu",
      address: {
        city: "NanJing",
      },
    });

    expect(store.mutate).toMatchObject({
      name: "Pikachu",
      address: {
        city: "NanJing",
      },
    });

    const { result } = renderHook(() => useSnapshot(store.mutate));
    expect(result.current).toEqual(getSnapshot(store.mutate));

    const callback = vitest.fn();
    store.subscribe(callback);

    expect(callback).toHaveBeenCalledTimes(0);

    store.mutate.name = "Charmander";
    runMacroTask(() => expect(callback).toHaveBeenCalledTimes(1));
  });

  it("should restore state when restore function was called", () => {
    const store = create({
      name: "Pikachu",
      address: {
        city: "NanJing",
      },
    });

    store.mutate.name = "Charmander";
    store.restore();

    runMacroTask(() =>
      expect(store.mutate).toMatchObject({
        name: "Pikachu",
        address: {
          city: "NanJing",
        },
      })
    );
  });

  it("should subscribe and unsubscribe", () => {
    const store = create({
      name: "Pikachu",
      address: {
        city: "NanJing",
      },
    });

    const callback = vitest.fn();
    const unsubscribe = store.subscribe(callback);

    store.mutate.name = "Charmander";
    runMacroTask(() => expect(callback).toHaveBeenCalledTimes(1));

    unsubscribe();
    store.mutate.name = "Pikachu";
    runMacroTask(() => expect(callback).toHaveBeenCalledTimes(1));
  });

  it("should notify when delete a property", () => {
    const store = create({
      name: "Pikachu",
      address: {
        city: "NanJing",
      },
    });

    const callback = vitest.fn();
    store.subscribe(callback);

    delete store.mutate.name;

    runMacroTask(() => expect(callback).toHaveBeenCalledTimes(1));
  });
});
