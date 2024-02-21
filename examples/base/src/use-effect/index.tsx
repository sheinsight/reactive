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
        <h1>name: {snap.name}</h1>
        <pre>引用：{JSON.stringify(snap.user, null, 2)}</pre>
        <button
          onClick={() => {
            store.mutate.user.address = {
              city: Math.random() + "",
            };
          }}
        >
          修改引用类型
        </button>
        <button
          onClick={() => {
            store.mutate.user.address.city = Math.random() + "";
          }}
        >
          修改基础类型
        </button>
        <button
          onClick={() => {
            store.mutate.name = "lll" + Math.random();
          }}
        >
          改其他字段
        </button>
      </div>
    </div>
  );
}
