import { memo } from 'react'
import ChildrenContainer from './children-container'
import { store } from './store'

export default memo(function Children4() {
  const snap = store.useSnapshot()

  return (
    <ChildrenContainer>
      <h3>Child 4</h3>
      <pre>with React.memo</pre>
      {snap.children4.name}
    </ChildrenContainer>
  )
})
