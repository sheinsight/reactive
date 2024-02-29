import ChildrenContainer from './children-container'
import { store } from './store'

export default function Children2() {
  const snap = store.useSnapshot()

  return (
    <ChildrenContainer>
      <h3>Child 2</h3>
      {snap.children2.name}
    </ChildrenContainer>
  )
}
