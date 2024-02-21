import ChildrenContainer from "./children-container";
import { store } from "./store";

export default function Children5() {
  const snap = store.useSnapshot();

  return (
    <ChildrenContainer>
      <h3>我是老五</h3>
      {snap.children5.name}
    </ChildrenContainer>
  );
}
