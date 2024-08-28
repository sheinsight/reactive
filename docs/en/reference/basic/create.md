# create

Create a Store with Hooks for React applications, integrated with enhancers like [withSubscribe](/guide/enhancers/builtins/with-subscribe), [withUseSubscribe](/guide/enhancers/builtins/with-use-subscribe), [withSnapshot](/guide/enhancers/builtins/with-snapshot), and [withUseSnapshot](/guide/enhancers/builtins/with-use-snapshot). If you are looking for a Store without Hooks, check out [createVanilla](/reference/basic/create-vanilla#create-vanilla).

```tsx
import { create } from '@shined/reactive';

const store = create(initialState, options?);

// Usage example
const store = create({ count: 0});

// store.mutate
// store.restore()

// store.useSnapshot()
// store.snapshot()
// store.subscribe()
```

Type definitions:

```tsx
// Currently, there are no creation options
export interface StoreCreateOptions {}
```

## store.mutate \{#store-mutate}

Proxy state, of the same object type as the initial value, which can be modified to change the Store's state.

```tsx
// Usage example
store.mutate.count = 1;
store.mutate.count += 1;
store.mutate.inputValue = 'Hello';
store.mutate.info = { name: 'Shined', age: 18 };
store.mutate.info.hobbies.push('Coding');
```

## store.snapshot \{#store-snapshot}

Get a snapshot of the Store, available since version `v0.2.0`, supported by the built-in [withSnapshot](/guide/enhancers/builtins/with-snapshot) enhancer.

```tsx
store.snapshot(selector?);

// Usage example
store.snapshot();
store.snapshot(s => s.count);
```

## store.useSnapshot \{#store-use-snapshot}

Get a snapshot of the Store within a React component, supported by the built-in [withUseSnapshot](/guide/enhancers/builtins/with-use-snapshot) enhancer.


```tsx
store.useSnapshot(selector?);
store.useSnapshot(options?);
store.useSnapshot(selector?, options?);

// Usage example
store.useSnapshot();
store.useSnapshot(s => s.count);
store.useSnapshot({ sync: true });
store.useSnapshot(s => s.inputValue, { sync: true });
```

Type definitions:

```tsx
export interface SnapshotOptions<StateSlice> {
  /**
   * Whether to notify updates synchronously, default is false, i.e., asynchronously batch updates to improve performance.
   * 
   * In some scenarios (such as using Chinese input methods in an input box), it may be necessary to immediately get the latest state, in which case it can be set to true.
   * 
   * @defaultValue false
   */
  sync?: boolean
  /**
   * Custom equality function to compare the previous and next state slices.
   * 
   * @defaultValue Object.is
   */
  isEqual?: (a: StateSlice, b: StateSlice) => boolean
}

export type SnapshotSelector<State, StateSlice> = (state: State) => StateSlice
```

## store.subscribe \{#store-subscribe}

Subscribe to Store changes, supported by the built-in [withSubscribe](/guide/enhancers/builtins/with-subscribe) enhancer, **not recommended for direct use unless necessary**.

```tsx
store.subscribe(listener, notifyInSync?, selector?);

// Usage example
store.subscribe(s => {
  console.log(s.count);
});
store.subscribe(s => {
  console.log(s.count);
}, true);
```

## store.useSubscribe \{#store-use-subscribe}

Subscribe to Store changes within a React component, supported by the built-in [withUseSubscribe](/guide/enhancers/builtins/with-use-subscribe) enhancer, **not recommended for direct use unless necessary**.

If you need to perform some side effects based on state changes, [useUpdateEffect](http://sheinsight.github.io/react-use/reference/use-update-effect) should be your first choice, rather than this method.

```tsx
const count = store.useSnapshot(s => s.count);

// Execute a side effect when count changes
useUpdateEffect(() => {
  console.log('Count has changed', count);
}, [count]);
```

```tsx
store.useSnapshot(listener, options?);

// Usage example, please consider using useUpdateEffect first
store.useSubscribe(() => {
  console.log('Store has changed');
});
store.useSubscribe(changes => {
  console.log('Store has changed', changes);
});
store.useSubscribe(() => {
  console.log('Store has changed');
}, { sync: true });
```

## store.restore \{#store-restore}

Restore the Store to its initial state.

```tsx
store.restore();
```
