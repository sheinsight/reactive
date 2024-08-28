# useSnapshot

Use this to get a snapshot of the Store in React components. Direct usage is not recommended; it is suggested to use [store.useSnapshot](/reference/basic/create#store-use-snapshot) instead.

```tsx
import { useSnapshot } from '@shined/reactive'

useSnapshot(proxyState, selector?, options?);

// Example usage
useSnapshot(store.mutate);
useSnapshot(store.mutate, s => s.count);
useSnapshot(store.mutate, { sync: true });
useSnapshot(store.mutate, s => s.inputValue, { sync: true });
useSnapshot(store.mutate.subObject, subObject => subObject.subCount);
```
