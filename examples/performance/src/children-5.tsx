import ChildrenContainer from "./children-container";
import { store } from "./store";

export default function Children5() {
  const snap = store.useSnapshot();

  return (
    <ChildrenContainer>
      <h1>我是老五</h1>
      {snap.children5.name}
    </ChildrenContainer>
  );
}
