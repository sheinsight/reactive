# snapshot

Get the snapshot of the Store. It is not recommended to use it directly. It's suggested to use [store.snapshot](/reference/basic/create#store-snapshot) instead.

```tsx
import { snapshot } from '@shined/reactive'

snapshot(proxyState, selector?);

// Usage example
snapshot(store.mutate);
snapshot(store.mutate, s => s.count);
snapshot(store.mutate.subObject);
snapshot(store.mutate.subObject, subObject => subObject.subCount);
```
