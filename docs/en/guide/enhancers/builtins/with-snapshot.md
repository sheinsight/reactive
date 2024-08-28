# withSnapshot

::: tip Tip
This enhancer is already built into `create`/`createVanilla`, allowing you to directly create a `store` with the `snapshot` method.
:::

This provides the `store` with a `store.snapshot()` method to capture the current snapshot of the `store`.

```tsx
import { createVanilla } from '@shined/reactive'

const store = createVanilla({ count: 0 })

// Already built in, directly use the snapshot method to get the store's snapshot data
const { count } = store.snapshot()
```
