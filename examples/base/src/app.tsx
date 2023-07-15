import "./App.css";
import { store } from "./store";
import Children from "./children";

function App() {
  return (
    <>
      <Children />
      <button
        onClick={() => {
          (async () => {
            store.current.address.city = {
              ...store.current.address.city,
              name: Math.random().toString(),
            };
            store.current.name = "张三" + Math.random().toString();
            await new Promise((resolve) => {
              setTimeout(resolve, 2000);
            });
            store.current.address.city.name = Math.random().toString();
          })();
        }}
      >
        点我
      </button>
    </>
  );
}

export default App;
