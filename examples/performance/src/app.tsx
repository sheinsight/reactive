import Children1 from "./children-1";
import Children2 from "./children-2";
import Children3 from "./children-3";
import Children4 from "./children-4";
import Children5 from "./children-5";
import { store } from "./store";
import "./app.css";

export default function App() {
  // const state = store.useSnapshot();
  // const state = store.useSnapshot({ sync: true });

  const snap = store.useSnapshot();

  return (
    <div
      style={{
        // width: 1000,
        // height: 200,
        padding: "10px 10px 10px 10px",
        border: "1px solid red",
        // backgroundColor: "#dedede",
        display: "flex",
        flexDirection: "column",

        // justifyContent: "space-around",
        // alignContent: "center",
        // alignItems: "center",
      }}
    >
      <div style={{ height: 100 }}>
        <button
          style={{ marginLeft: 20, marginRight: 20 }}
          onClick={() => {
            store.mutate.parent.name = String(Math.random().toFixed(4));
          }}
        >
          揍爸爸
        </button>
        我是父容器: {snap.parent.name}
      </div>

      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyItems: "center",
          justifyContent: "space-around",
        }}
      >
        <button
          onClick={() => {
            store.mutate.children1.name = String(Math.random().toFixed(4));
          }}
        >
          揍老大
        </button>
        <button
          onClick={() => {
            store.mutate.children2.name = String(Math.random().toFixed(4));
          }}
        >
          揍老二
        </button>
        <button
          onClick={() => {
            store.mutate.children3.name = String(Math.random().toFixed(4));
          }}
        >
          揍老三
        </button>
        <button
          onClick={() => {
            store.mutate.children4.name = String(Math.random().toFixed(4));
          }}
        >
          揍老四
        </button>
        <button
          onClick={() => {
            store.mutate.children5.name = String(Math.random().toFixed(4));
          }}
        >
          揍老五
        </button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Children1 />
        <Children2 />
        <Children3 />
        <Children4 />
        <Children5 />
      </div>
    </div>
  );
}
