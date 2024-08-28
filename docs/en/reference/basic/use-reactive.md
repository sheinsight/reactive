# useReactive

A React component-level state management Hook that is lightweight and instance-isolated, suitable for small, cohesive state management scenarios.

```tsx
import { useReactive } from '@shined/reactive';

const [snapshot, mutate] = useReactive(initialState, options?);

// Usage example
function App() {
  const [{ count }, mutate] = useReactive({ count: 0 })
  return (
    <>
      <div>{count}</div>
      <button onClick={() => mutate.count++}>Increment</button>
    </>
  )
}

```
