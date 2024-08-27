# useSubscribe {#use-subscribe}

在 React 组件中订阅 Store 的变化，不推荐直接使用，建议使用 [store.useSubscribe](/reference/basic/create#store-use-subscribe)。

如果你需要基于状态变化执行一些副作用，应该首选使用 [useUpdateEffect](http://sheinsight.github.io/react-use/reference/use-update-effect)，而不是此方法。

```tsx
const count = useSnapshot(store.mutate, s => s.count);

// 当 count 变化时执行副作用
useUpdateEffect(() => {
  console.log('Count has changed', count);
}, [count]);
```

```tsx
import { useSubscribe } from '@shined/reactive'

useSnapshot(proxyState, listener, options?);

// 使用示例
useSubscribe(store.mutate, () => {
  console.log('Store has changed');
});
useSubscribe(store.mutate, changes => {
  console.log('Store has changed', changes);
});
useSubscribe(store.mutate, () => {
  console.log('Store has changed');
}, { sync: true });
```
