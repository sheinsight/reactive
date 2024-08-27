# produce {#produce}

一个类似于 [immer](https://immerjs.github.io/immer/) 的 [produce](https://immerjs.github.io/immer/produce) 方法的可选替代品，但它要求**纯对象**作为初始状态，不支持**循环引用**。


```tsx
import { produce } from '@shined/reactive';

produce(state, producer);

// 使用示例
const state = { count: 0 };

const nextState = produce(state, draft => {
  draft.count += 1;
});

console.log(nextState.count); // 1
```
