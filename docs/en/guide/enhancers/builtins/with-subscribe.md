# withSubscribe

::: tip Tip
This enhancer is already built into `create`/`createVanilla`. You can directly create a `store` with the `subscribe` method through them.
:::

Provides the `store` with a `store.subscribe()` method to get the current snapshot of the `store`.

```tsx
import { createVanilla } from '@shined/reactive'

const store = createVanilla({ count: 0 })

// Already built in, directly use the subscribe method to subscribe to the store's state changes
store.subscribe((changes) => {
  console.log('store changed:', changes)
})
```
