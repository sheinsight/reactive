# withUseSubscribe

::: tip Tip
This enhancer has already been integrated into `create`. You can directly create a `store` with the `useSubscribe` method through it.
:::

Provides the `store.useSubscribe()` method to the `store`, allowing subscription to the `store`'s state within React components, automatically unsubscribing upon unmounting.

For details on using `store.useSubscribe`, please refer to [store.useSubscribe](/reference/basic/create#store-use-subscribe).

```tsx
import { createVanilla, withUseSubscribe } from '@shined/reactive'

const store = withUseSubscribe(
  createVanilla({
    count: 0,
    tab: 'home' as 'home' | 'about',
  }),
)

// Subscribe to the state of the store in React, automatically unsubscribe on unmount
store.useSubscribe((changes) => {
  console.log('store changed:', changes)
})
```
