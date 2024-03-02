import { Area } from './area'

import BasicDemo from './basic'
import UseEffectDemo from './use-effect'
import PerformanceDemo from './performance'

export default function App() {
  return (
    <div>
      <h2>Example for Test</h2>

      <Area name="Basic Demo">
        <BasicDemo />
      </Area>

      <Area name="UseEffect Demo">
        <UseEffectDemo />
      </Area>

      <Area name="Performance Demo">
        <PerformanceDemo />
      </Area>
    </div>
  )
}
