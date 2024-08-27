# subscribe {#subscribe}

订阅 Store 的变化，不推荐直接使用，建议使用 [store.subscribe](/reference/basic/create#store-subscribe)。

```tsx
import { subscribe } from '@shined/reactive'

subscribe(proxyState, listener, notifyInSync?, selector?);

// 使用示例
subscribe(store.mutate, s => {
  console.log(s.count);
});
subscribe(store.mutate.subObject, s => {
  console.log(s.count);
}, true);
```
