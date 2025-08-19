// import { Area } from './area'
// import BasicDemo from './basic'
// import UseEffectDemo from './use-effect'
// import PerformanceDemo from './performance'

import { create, setGlobalNotifyInSync, proxyCount } from '@shined/reactive'
import { useEffect, useState } from 'react'

const store = create({
  inputValue: 'init',
  count: 0,
  other: true,
  other2: false,
  // data: response.info.data,
  obj: {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: 4,
    },
    f: [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
    ],
  },
})

const inputStore = create({ inputValue: '' })

setGlobalNotifyInSync(true)

export default function App() {
  const { count } = store.useSnapshot({ sync: true })

  // const [count, setCount] = useState(0)
  // const [inputValue, setInputValue] = useState('')
  // const [other, setOther] = useState(false)
  // const [other2, setOther2] = useState(false)

  const handleClick = async () => {
    await Promise.resolve()

    store.mutate.count++
    store.mutate.inputValue += '#'
    store.mutate.other = !store.mutate.other
    store.mutate.other2 = !store.mutate.other2

    //   setCount(count + 1)
    //   setInputValue(inputValue + '#')
    //   setOther(!other)
    //   setOther2(!other2)
  }

  const { inputValue } = inputStore.useSnapshot()

  console.log('re-render', count)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(proxyCount(store.mutate), store.mutate)
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <input
        value={inputValue}
        onChange={(event) => {
          inputStore.mutate.inputValue = event.target.value
        }}
      />
      <button type="button" onClick={handleClick}>
        Test
      </button>
      <button
        type="button"
        onClick={() => {
          Object.assign(store.mutate.obj, {
            [`new-${Math.random()}`]: { a: Math.random(), b: Math.random() },
          })
        }}
      >
        add obj
      </button>
      <button
        type="button"
        onClick={() => {
          const obj = store.mutate.obj
          if (Object.keys(obj).length > 0) {
            const key = Object.keys(obj)[0]
            // @ts-ignore
            delete obj[key]
          }
        }}
      >
        remove obj
      </button>
      <button
        type="button"
        onClick={() => {
          store.mutate.obj.f.push({ id: Math.random(), name: `new-${Math.random()}` })
        }}
      >
        push array item
      </button>
      <button
        type="button"
        onClick={() => {
          store.mutate.obj.f.pop()
        }}
      >
        pop array item
      </button>
    </div>
  )
}

// export default function App() {
//   return (
//     <div>
//       <h2>Example for Test</h2>

//       <Area name="Basic Demo">
//         <BasicDemo />
//       </Area>

//       <Area name="UseEffect Demo">
//         <UseEffectDemo />
//       </Area>

//       <Area name="Performance Demo">
//         <PerformanceDemo />
//       </Area>
//     </div>
//   )
// }
