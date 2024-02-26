import Children1 from './children-1'
import Children2 from './children-2'
import Children3 from './children-3'
import Children4 from './children-4'
import Children5 from './children-5'
import { store } from './store'

export default function PerformanceDemo() {
  const snap = store.useSnapshot()

  return (
    <div
      style={{
        padding: '10px 10px 10px 10px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: 100 }}>
        <button
          style={{ marginLeft: 20, marginRight: 20 }}
          onClick={() => {
            store.mutate.parent.name = String(Math.random().toFixed(4))
          }}
        >
          kick father
        </button>
        Father: {snap.parent.name}
      </div>

      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          justifyItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <button
          onClick={() => {
            store.mutate.children1.name = String(Math.random().toFixed(4))
          }}
        >
          kick child1
        </button>
        <button
          onClick={() => {
            store.mutate.children2.name = String(Math.random().toFixed(4))
          }}
        >
          kick child2
        </button>
        <button
          onClick={() => {
            store.mutate.children3.name = String(Math.random().toFixed(4))
          }}
        >
          kick child3
        </button>
        <button
          onClick={() => {
            store.mutate.children4.name = String(Math.random().toFixed(4))
          }}
        >
          kick child4
        </button>
        <button
          onClick={() => {
            store.mutate.children5.name = String(Math.random().toFixed(4))
          }}
        >
          kick child5
        </button>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Children1 />
        <Children2 />
        <Children3 />
        <Children4 />
        <Children5 />
      </div>
    </div>
  )
}
