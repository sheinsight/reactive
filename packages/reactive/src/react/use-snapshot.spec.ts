import { describe, it, expect } from "vitest";
import { act, waitFor, renderHook } from "@testing-library/react";

import { useSnapshot } from "./use-snapshot.js";
import { proxy, getSnapshot } from "../vanilla";

describe("useSnapShot", () => {
  it("should return proxyState snapshot", () => {
    const proxyState = proxy({ name: "张三" });
    const { result } = renderHook(() => useSnapshot(proxyState));
    expect(result.current).toEqual(getSnapshot(proxyState));
  });

  it("should return updated proxyState snapshot", async () => {
    const proxyState = proxy({
      address: {
        city: {
          name: "上海",
        },
      },
    });

    const { result } = renderHook(() => useSnapshot(proxyState));

    act(() => {
      proxyState.address.city.name = "北京";
    });

    await waitFor(() => {
      expect(result.current.address.city.name).toEqual("北京");
    });
  });

  it("snapshot can not be extend", () => {
    const proxyState = proxy({
      address: {
        city: {
          name: "上海",
        },
      },
    });

    const { result } = renderHook(() => useSnapshot(proxyState));

    expect(() => {
      act(() => {
        // @ts-expect-error for test
        result.current.address.city.hi = "北京";
      });
    }).toThrowError();

    // @ts-expect-error for test
    expect(result.current.address.city.hi).toEqual(undefined);
  });
});
