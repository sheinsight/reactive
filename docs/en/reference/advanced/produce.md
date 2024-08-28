# produce

An optional alternative to the [immer](https://immerjs.github.io/immer/)'s [produce](https://immerjs.github.io/immer/produce) method, but it requires **pure objects** as the initial state and does not support **circular references**.

```tsx
import { produce } from '@shined/reactive';

produce(state, producer);

// Usage example
const state = { count: 0 };

const nextState = produce(state, draft => {
  draft.count += 1;
});

console.log(nextState.count); // 1
```
