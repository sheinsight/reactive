import {
  addProperty,
  asyncChangeName,
  deleteProperty,
  mutateNestedProperty,
  mutateTopProperty,
  popFromArray,
  pushToArray,
  store,
} from "./store";

export default function BasicDemo() {
  return (
    <>
      <Children2 />
      <Children />
      <div>
        <button onClick={mutateTopProperty}>mutate top property</button>
        <button onClick={mutateNestedProperty}>mutate nested property</button>
      </div>

      <div>
        <button onClick={addProperty}>add property</button>
        <button onClick={deleteProperty}>delete property</button>
      </div>

      <div>
        <button onClick={pushToArray}>push to array</button>
        <button onClick={popFromArray}>pop from array</button>
      </div>

      <button onClick={asyncChangeName}>async change name</button>
      <button onClick={store.restore}>restore to initial state</button>
    </>
  );
}

function Children() {
  const state = store.useSnapshot({ sync: true });
  const content = JSON.stringify(state, null, 2);

  return (
    <div>
      <input
        type="text"
        value={state.inputValue}
        onChange={(e) => {
          store.mutate.inputValue = e.target.value;
        }}
      />
      <pre style={{ marginBottom: "2rem" }}>{content}</pre>
    </div>
  );
}

const Children2 = () => {
  const state = store.useSnapshot();
  console.log("render C2");
  return <h1>{state.name}</h1>;
};
