import { act, renderHook } from "@testing-library/react-hooks/dom";
import { useSnapshot } from "./use-snapshot.js";
import { getSnapshot } from "./utils.js";
import { describe, it, expect } from "vitest";
import { proxy } from "./proxy.js";

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

    const { result, waitForNextUpdate } = renderHook(() => useSnapshot(proxyState));

    act(() => {
      proxyState.address.city.name = "北京";
    });

    await waitForNextUpdate();

    expect(result.current.address.city.name).toEqual("北京");
  });

  it("snapshot can not be updated", () => {
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
        // @ts-expect-error: for test
        result.current.address.city.name = "北京";
      });
    }).toThrowError();

    expect(result.current.address.city.name).toEqual("上海");
  });
});
