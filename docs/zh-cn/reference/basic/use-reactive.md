# useReactive {#use-reactive}

用于 React 组件级别的状态管理 Hooks，轻量、实例隔离，适用于小型、内聚的状态管理场景。

```tsx
import { useReactive } from '@shined/reactive';

const [snapshot, mutate] = useReactive(initialState, options?);

// 使用示例
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
