import ChildrenContainer from './children-container'
import { store } from './store'
import { memo } from 'react'

export default memo(function Children4() {
  const snap = store.useSnapshot()

  return (
    <ChildrenContainer>
      <h3>Child 4</h3>
      {snap.children4.name}
      <pre>with React.memo</pre>
    </ChildrenContainer>
  )
})
