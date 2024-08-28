# useSubscribe

Subscribe to Store changes within a React component. It's not recommended to use this directly, instead using [store.useSubscribe](/reference/basic/create#store-use-subscribe) is advised.

If you need to perform some side effects based on state changes, you should prefer using [useUpdateEffect](http://sheinsight.github.io/react-use/reference/use-update-effect) over this method.

```tsx
const count = useSnapshot(store.mutate, s => s.count);

// Execute side effects when count changes
useUpdateEffect(() => {
  console.log('Count has changed', count);
}, [count]);
```

```tsx
import { useSubscribe } from '@shined/reactive'

useSnapshot(proxyState, listener, options?);

// Usage example
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
