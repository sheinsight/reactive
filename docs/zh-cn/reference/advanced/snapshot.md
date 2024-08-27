# snapshot {#snapshot}

获取 Store 的快照，不推荐直接使用，建议使用 [store.snapshot](/reference/basic/create#store-snapshot)。

```tsx
import { snapshot } from '@shined/reactive'

snapshot(proxyState, selector?);

// 使用示例
snapshot(store.mutate);
snapshot(store.mutate, s => s.count);
snapshot(store.mutate.subObject);
snapshot(store.mutate.subObject, subObject => subObject.subCount);

```
