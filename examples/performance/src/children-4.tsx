/* eslint-disable react-refresh/only-export-components */

import ChildrenContainer from "./children-container";
import { store } from "./store";
import { memo } from "react";

export default memo(function Children4() {
  const snap = store.useSnapshot();

  return (
    <ChildrenContainer>
      <h1>我是老四</h1>
      {snap.children4.name}
      <span>我带了一个帽子</span>
    </ChildrenContainer>
  );
});
