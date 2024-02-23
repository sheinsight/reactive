import { store } from "./store";

export const ValtioDemo = () => {
  const snap = store.useSnapshot();

  return (
    <div>
      <h2>ValtioDemo</h2>
      <div>{snap.obj.name}</div>
      <div>{snap.obj.info.age}</div>
      <button onClick={() => store.mutate.obj.info.age++}>age++</button>
      <button onClick={() => (store.mutate.obj.hobbies[1].abc = "123")}>age++</button>
    </div>
  );
};
