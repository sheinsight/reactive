# Proxy

Creates a proxy object for a Store, used internally to create [store.mutate](/reference/basic/create#store-mutate). Its direct usage is not recommended.

```tsx
import { proxy } from '@shined/reactive'

proxy(state, parentProps?);

// Usage example
const proxyState = proxy({
  count: 0,
  inputValue: 'Hello'
});

proxyState.count += 1;
const snapshot = snapshot(proxyState);
```
