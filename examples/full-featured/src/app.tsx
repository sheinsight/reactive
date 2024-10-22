import { Area } from './area'

import BasicDemo from './basic'
import PerformanceDemo from './performance'
import UseEffectDemo from './use-effect'

export default function App() {
  return (
    <div>
      <h2>Reactive Demo</h2>

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
