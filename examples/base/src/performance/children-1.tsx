import { useEffect, useState } from 'react'
import ChildrenContainer from './children-container'
import { store } from './store'

export default function Children1() {
  const snap = store.useSnapshot()
  const [shake, setShake] = useState(false)

  useEffect(() => {
    setShake(true)
  }, [snap.children1])

  return (
    <ChildrenContainer
      className={`box ${shake ? 'shake' : ''}`}
      onAnimationEnd={() => setShake(false)}
    >
      <h3>我是老大</h3>
      {snap.children1.name}
    </ChildrenContainer>
  )
}
