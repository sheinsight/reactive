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
          修改顶层基础类型
        </button>
        <button
          onClick={() => {
            store.mutate.user.address = {
              city: Math.random() + '',
            }
          }}
        >
          修改引用类型（替换 address）
        </button>
        <button
          onClick={async () => {
            store.mutate.user.address = {
              city: Math.random() + '',
            }
            store.mutate.name = Math.random() + ''
          }}
        >
          异步修改
        </button>
        <button
          onClick={() => {
            store.mutate.user.address.city = Math.random() + ''
          }}
        >
          修改嵌套基础类型
        </button>
      </div>
    </div>
  )
}
