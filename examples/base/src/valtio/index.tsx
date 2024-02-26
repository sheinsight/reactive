import { store } from './store'

export const ValtioDemo = () => {
  const snap = store.useSnapshot()

  return (
    <div>
      <h2>ValtioDemo</h2>
      <div>name: {snap.obj.name}</div>
      <div>age: {snap.obj.info.age}</div>
      <button onClick={() => store.mutate.obj.name++}>name++</button>
      <button onClick={() => store.mutate.obj.info.age++}>age++</button>
    </div>
  )
}
