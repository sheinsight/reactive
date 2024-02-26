import ChildrenContainer from './children-container'
import { store } from './store'

export default function Children3() {
  const snap = store.useSnapshot()

  return (
    <ChildrenContainer>
      <h3>Child 3</h3>
      {snap.children3.name}
    </ChildrenContainer>
  )
}
