import ChildrenContainer from './children-container'
import { store } from './store'
import { memo } from 'react'

export default memo(function Children4() {
  const snap = store.useSnapshot()

  return (
    <ChildrenContainer>
      <h3>我是老四</h3>
      {snap.children4.name}
      <span>我带了一个帽子</span>
      <pre>React.memo</pre>
    </ChildrenContainer>
  )
})
