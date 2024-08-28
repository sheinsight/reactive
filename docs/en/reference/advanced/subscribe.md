# subscribe

Subscribe to Store changes. Direct use is not recommended; it is suggested to use [store.subscribe](/reference/basic/create#store-subscribe) instead.

```tsx
import { subscribe } from '@shined/reactive'

subscribe(proxyState, listener, notifyInSync?, selector?);

// Example Usage
subscribe(store.mutate, s => {
  console.log(s.count);
});
subscribe(store.mutate.subObject, s => {
  console.log(s.count);
}, true);
```
