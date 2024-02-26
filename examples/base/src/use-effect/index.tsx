import { useEffect } from 'react'

import { store } from './store'

export default function UseEffectDemo() {
  const snap = store.useSnapshot()
  const address = snap.user.address

  useEffect(() => {
    console.log('name changed:', snap.name)
  }, [snap.name])

  useEffect(() => {
    console.log('address changed:', address)
  }, [address])

  useEffect(() => {
    console.log('address.city changed:', address.city)
  }, [address.city])

  console.log('render')

  return (
    <div>
      <div>
        <pre>name: {snap.name}</pre>
        <pre>user: {JSON.stringify(snap.user, null, 2)}</pre>
        <button
          onClick={() => {
            store.mutate.name = Math.random() + ''
          }}
        >
          mutate top basic
        </button>
        <button
          onClick={() => {
            store.mutate.user.address = {
              city: Math.random() + '',
            }
          }}
        >
          replace object
        </button>
        <button
          onClick={async () => {
            store.mutate.user.address = {
              city: Math.random() + '',
            }
            store.mutate.name = Math.random() + ''
          }}
        >
          mutate async
        </button>
        <button
          onClick={() => {
            store.mutate.user.address.city = Math.random() + ''
          }}
        >
          mutate nested
        </button>
      </div>
    </div>
  )
}
