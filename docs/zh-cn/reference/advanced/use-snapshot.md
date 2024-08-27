# useSnapshot {#use-snapshot}

在 React 组件中获取 Store 的快照，不推荐直接使用，建议使用 [store.useSnapshot](/reference/basic/create#store-use-snapshot)。

```tsx
import { useSnapshot } from '@shined/reactive'

useSnapshot(proxyState, selector?, options?);

// 使用示例
useSnapshot(store.mutate);
useSnapshot(store.mutate, s => s.count);
useSnapshot(store.mutate, { sync: true });
useSnapshot(store.mutate, s => s.inputValue, { sync: true });
useSnapshot(store.mutate.subObject, subObject => subObject.subCount);
```
