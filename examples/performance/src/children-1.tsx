import { useState } from "react";
import ChildrenContainer from "./children-container";
import { store } from "./store";

import { useSubscribe } from "@shined/reactive";

export default function Children1() {
  const snap = store.useSnapshot();
  const [shake, setShake] = useState(false);
  useSubscribe(
    () => {
      setShake(true);
    },
    {
      deps: [store.mutate.children1],
    }
  );

  return (
    <ChildrenContainer
      className={`box ${shake ? "shake" : ""}`}
      onAnimationEnd={() => setShake(false)}
    >
      <h1>我是老大</h1>
      {snap.children1.name}
    </ChildrenContainer>
  );
}
