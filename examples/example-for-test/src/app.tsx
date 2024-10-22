// import { Area } from './area'
// import BasicDemo from './basic'
// import UseEffectDemo from './use-effect'
// import PerformanceDemo from './performance'

import { create } from '@shined/reactive'
import { useEffect, useState } from 'react'

const store = create({ inputValue: 'init', count: 0, other: true, other2: false })

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

  console.log('re-render', count)

  return (
    <button type="button" onClick={handleClick}>
      Test
    </button>
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
