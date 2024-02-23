import { describe, it, expect } from "vitest";
import { act, waitFor, renderHook } from "@testing-library/react";

import { useSnapshot } from "./use-snapshot.js";
import { proxy, getSnapshot } from "../vanilla";

describe("useSnapShot", () => {
  it("should be defined", () => {
    expect(useSnapshot).toBeDefined();
  });

  it("should return snapshot", () => {
    const proxyState = proxy({ name: "Bob" });
    const { result } = renderHook(() => useSnapshot(proxyState));
    expect(result.current).toEqual(getSnapshot(proxyState));
  });

  it("should update snapshot", async () => {
    const proxyState = proxy({
      address: {
        city: {
          name: "Shanghai",
        },
      },
    });

    const { result } = renderHook(() => useSnapshot(proxyState));

    act(() => {
      // default async batch update is enabled for refine render performance
      proxyState.address.city.name = "any previous value";
      proxyState.address.city.name = "Nanjing";
    });

    // update are async, in this sync context, it will still be "Shanghai"
    expect(result.current.address.city.name).toEqual("Shanghai");

    await waitFor(() => {
      // after async batch update, this will be "Nanjing"
      expect(result.current.address.city.name).toEqual("Nanjing");
    });
  });

  it("basic selector should be work", () => {
    const proxyState = proxy({ name: "Bob" });
    const { result } = renderHook(() => useSnapshot(proxyState, (s) => s.name));
    expect(result.current).toEqual("Bob");
  });

  it("return array selector should be work", () => {
    const proxyState = proxy({ name: "Bob", age: 32 });
    const { result } = renderHook(() => {
      const [name, age] = useSnapshot(proxyState, (s) => [s.name, s.age]);
      return [name, age];
    });
    expect(result.current).toMatchObject(["Bob", 32]);
  });

  it("selector should refine render performance", async () => {
    const proxyState = proxy({ name: "Bob", other: "other" });
    const { result } = renderHook(() => useSnapshot(proxyState, (s) => s.name));

    act(() => {
      proxyState.other = "other value";
    });
  });

  it("should return updated proxyState snapshot with sync option", async () => {
    const proxyState = proxy({
      address: {
        city: {
          name: "Shanghai",
        },
      },
    });

    const { result } = renderHook(() => useSnapshot(proxyState, { sync: true }));

    act(() => {
      proxyState.address.city.name = "Nanjing";
    });

    // when sync is enabled, it will be "Nanjing" as it is sync update
    expect(result.current.address.city.name).toEqual("Nanjing");
  });

  it("should return updated proxyState snapshot with custom isEqual", async () => {
    const proxyState = proxy({
      address: {
        city: {
          name: "Shanghai",
        },
      },
    });

    const { result } = renderHook(() => useSnapshot(proxyState, { isEqual: (a, b) => a === b }));

    act(() => {
      proxyState.address.city.name = "Nanjing";
    });

    // update are sync, in this sync context, it will be "Shanghai"
    expect(result.current.address.city.name).toEqual("Shanghai");
  });
});
