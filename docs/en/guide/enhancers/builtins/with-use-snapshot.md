# withUseSnapshot

::: tip Tip
This enhancer has been built into `create`, allowing you to directly create a `store` with the `useSnapshot` method.
:::

Adds the `store.useSnapshot()` method to `store`, enabling the latest value of derived data to be obtained within React components, with rendering optimization.

For details on using `store.useSnapshot`, please refer to [store.useSnapshot](/reference/basic/create#store-use-snapshot).


```tsx
import { createVanilla, withUseSnapshot } from '@shined/reactive'

const store = withUseSnapshot(
  createVanilla({
    count: 0,
    tab: 'home' as 'home' | 'about',
  }),
)

// In React, with rendering optimization
const { count, tab } = store.useSnapshot()
const [count, tab] = store.useSnapshot(s => [s.count, s.tab] as const)
```
