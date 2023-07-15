import { store } from "./store";

export default function Children() {
  const state = store.useSnapshot();

  return (
    <>
      <h1>{state.name}</h1>
      <h1>{state.address.city.name}</h1>
    </>
  );
}
