# proxy {#proxy}

创建一个 Store 的代理对象，在内部用于创建 [store.mutate](/reference/basic/create#store-mutate)，不推荐直接使用。

```tsx
import { proxy } from '@shined/reactive'

proxy(state, parentProps?);

// 使用示例
const proxyState = proxy({
  count: 0,
  inputValue: 'Hello'
});

proxyState.count += 1;
const snapshot = snapshot(proxyState);
```
