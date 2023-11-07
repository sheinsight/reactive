import { useEffect } from "react";
// import { original } from "@shined/reactive";

import { store } from "./store";
import "./app.css";

export default function App() {
  const snap = store.useSnapshot();
  const address = snap.user.address;

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <div>
      <div>
        <h1>{snap.name}</h1>
        <button
          onClick={() => {
            store.mutate.user.address = {
              city: "上海",
            };
          }}
        >
          改引用
        </button>
        <button
          onClick={() => {
            store.mutate.user.address.city = "上海";
          }}
        >
          改引用里面的名字
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
