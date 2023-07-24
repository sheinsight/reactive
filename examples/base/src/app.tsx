import "./App.css";
import { onChange, store } from "./store";
import Children from "./children";

function App() {
  return (
    <>
      <Children />
      <button onClick={onChange}>Click me change name</button>
      <button onClick={store.restore}>restore sate</button>
    </>
  );
}

export default App;
