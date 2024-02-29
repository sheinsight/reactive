import { useEffect, useRef } from 'react'

import { store } from './store'

export default function UseEffectDemo() {
  const ref = useRef({
    render: 0,
    snap: 0,
    'snap.unused': 0,
    'snap.count': 0,
    'snap.user': 0,
    'snap.user[0]': 0,
    'snap.user[0].name': 0,
  })

  const e = ref.current
  const snap = store.useSnapshot()

  useEffect(() => void e['snap']++, [snap])
  useEffect(() => void e['snap.unused']++, [snap.unused])
  useEffect(() => void e['snap.count']++, [snap.count])
  useEffect(() => void e['snap.user']++, [snap.user])
  useEffect(() => void e['snap.user[0]']++, [snap.user[0]])
  useEffect(() => void e['snap.user[0].name']++, [snap.user[0].name])

  e['render']++

  return (
    <div>
      <div>
        <pre>component render times 👉 {e['render']}</pre>

        <h4>Store Snapshot 👇</h4>
        <pre>{JSON.stringify(snap)}</pre>

        <h4>React.useEffect 👇</h4>
        <pre>🟢 snap 👉 {e['snap']}</pre>
        <pre>🟢 snap.unused 👉 {e['snap.unused']}</pre>
        <pre>🟢 snap.count 👉 {e['snap.count']}</pre>
        <pre>🟢 snap.user 👉 {e['snap.user']}</pre>
        <pre>🟢 snap.user[0] 👉 {e['snap.user[0]']}</pre>
        <pre>🟢 snap.user[0].name 👉 {e['snap.user[0].name']}</pre>

        <button onClick={() => store.mutate.count++}>mutate `count`</button>
        <button onClick={() => (store.mutate.user[0] = { name: Math.random() + '' })}>
          replace `user[0]`
        </button>
        <button
          onClick={async () => {
            store.mutate.count++
            store.mutate.user[0].name = Math.random() + ''
          }}
        >
          mutate async
        </button>
        <button onClick={() => (store.mutate.user[0].name = Math.random() + '')}>
          mutate `name`
        </button>
      </div>
    </div>
  )
}
