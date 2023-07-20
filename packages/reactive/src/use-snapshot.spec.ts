import { act, renderHook } from "@testing-library/react-hooks/dom";
import { useSnapshot } from "./use-snapshot";
import { getSnapshot } from "./utils";
import { describe, it, expect } from "vitest";
import { proxy } from "./proxy";

describe("useSnapShot", () => {
  it("should return proxyState snapshot", () => {
    const proxyState = proxy({ name: "张三" });
    const { result } = renderHook(() => useSnapshot(proxyState));
    expect(result.current).toEqual(getSnapshot(proxyState));
  });

  it("should return updated proxyState snapshot", () => {
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
