import { useEffect } from "react";
// import { original } from "@shined/reactive";

import { store } from "./store";
import "./index.css";

export default function UseEffectDemo() {
  const snap = store.useSnapshot();
  const address = snap.user.address;

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <div>
      <div>
        <pre>name: {snap.name}</pre>
        <pre>user: {JSON.stringify(snap.user, null, 2)}</pre>
        <button
          onClick={() => {
            store.mutate.name = Math.random() + "";
          }}
        >
          修改顶层基础类型
        </button>
        <button
          onClick={() => {
            store.mutate.user.address = {
              city: Math.random() + "",
            };
          }}
        >
          修改引用类型（替换 address）
        </button>
        <button
          onClick={() => {
            store.mutate.user.address.city = Math.random() + "";
          }}
        >
          修改嵌套基础类型
        </button>
      </div>
    </div>
  );
}
