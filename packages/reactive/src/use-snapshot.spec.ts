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
});
