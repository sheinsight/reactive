# create {#create}

Create a Store with Hooks for React applications, featuring built-in enhancers: [withSubscribe](/guide/enhancers/builtins/with-subscribe), [withUseSubscribe](/guide/enhancers/builtins/with-use-subscribe), [withSnapshot](/guide/enhancers/builtins/with-snapshot), and [withUseSnapshot](/guide/enhancers/builtins/with-use-snapshot). If you are looking for a Store without Hooks, please refer to [createVanilla](/reference/basic/create-vanilla#create-vanilla).

```tsx
import { create } from '@shined/reactive';

const store = create(initialState);

// Usage example
const store = create({ count: 0});

store.mutate
store.restore()

store.snapshot()
store.useSnapshot()
store.subscribe()
store.useSubscribe()
```

## store.mutate {#store-mutate}

Proxy state, of the same object type as the initial value, allows for modifying this object to change the Store's status.

```tsx
// Usage example
store.mutate.count = 1;
store.mutate.count += 1;
store.mutate.inputValue = 'Hello';
store.mutate.info = { name: 'Shined', age: 18 };
store.mutate.info.hobbies.push('Coding');
```

## store.snapshot {#store-snapshot}

Retrieve a snapshot of the Store, available since `v0.2.0`, supported by the built-in [withSnapshot](/guide/enhancers/builtins/with-snapshot) enhancer.

```tsx
const snapSlice = store.snapshot(selector?);

// Usage example
const snap = store.snapshot();
const count = store.snapshot(s => s.count);
```

Related type definitions:

```tsx
export interface WithSnapshotContributes<State extends object> {
  /**
   * Retrieves a snapshot of the state.
   */
  snapshot: <StateSlice = State>(selector?: SnapshotSelector<State, StateSlice>) => StateSlice
}

export type SnapshotSelector<State, StateSlice> = (state: State) => StateSlice
```

## store.useSnapshot {#store-use-snapshot}

Retrieve a snapshot of the Store in a React component, supported by the built-in [withUseSnapshot](/guide/enhancers/builtins/with-use-snapshot) enhancer.

```tsx
store.useSnapshot(selector?);
store.useSnapshot(options?);
store.useSnapshot(selector?, options?);

// Usage example
const snap = store.useSnapshot();
const count = store.useSnapshot(s => s.count);
const syncSnap = store.useSnapshot({ sync: true });
const syncValue = store.useSnapshot(s => s.inputValue, { sync: true });
```

Related type definitions:

```tsx
export interface WithUseSnapshotContributes<State extends object> {
  /**
   * Retrieves a snapshot of the state.
   */
  useSnapshot: StoreUseSnapshot<State>
}

export type SnapshotSelector<State, StateSlice> = (state: State) => StateSlice

export interface StoreUseSnapshot<State> {
  (): State
  (options: SnapshotOptions<State>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>): StateSlice
  <StateSlice>(selector: undefined, options: SnapshotOptions<StateSlice>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>, options: SnapshotOptions<StateSlice>): StateSlice
}

export interface SnapshotOptions<StateSlice> {
  /**
   * Whether to notify updates synchronously, default is false, i.e., asynchronous batch updates to enhance performance.
   * 
   * In some scenarios, such as using a Chinese input method in a text field, you may need to get the latest state immediately. Set this to true in those cases.
   * 
   * @defaultValue false
   */
  sync?: boolean
  /**
   * Custom equality function used to compare the previous and next state slices.
   * 
   * @defaultValue Object.is
   */
  isEqual?: (a: StateSlice, b: StateSlice) => boolean
}
```

## store.subscribe {#store-subscribe}

Subscribe to changes in the Store, supported by the built-in [withSubscribe](/guide/enhancers/builtins/with-subscribe) enhancer, **not recommended unless necessary**.

```tsx
store.subscribe(listener, notifyInSync?, selector?);

// Usage example
store.subscribe(() => {
  console.log(store.snapshot());
});

const unsubscribe = store.subscribe(() => {
  console.log(store.snapshot());
}, true);

// Unsubscribe
unsubscribe()
```

Related type definitions:

```tsx
export interface WithSubscribeContributes<State extends object> {
  /**
   * Subscribe to changes in the Store's state.
   *
   * @param listener - The callback function to subscribe.
   * @param sync - Whether to notify updates synchronously, default is false, for performance through asynchronous batch updates.
   * @param selector - Selector for the state slice to listen for changes.
   */
  subscribe: (listener: SubscribeListener<State>, sync?: boolean, selector?: (state: State) => object) => () => void
}

export type ChangeItem<State> = {
  props: PropertyKey[] // ['a', 'b', 0, 'c']
  propsPath: string // 'a.b[0].c'
  previous: unknown
  current: unknown
  snapshot: State
}

export type SubscribeListener<State> = (changes: ChangeItem<State>, version?: number) => void
```

## store.useSubscribe {#store-use-subscribe}

Subscribe to changes in the Store within React components, subscribing to changes upon component mount and unsubscribing on component unmount, supported by the built-in [withUseSubscribe](/guide/enhancers/builtins/with-use-subscribe) enhancer, **not recommended unless necessary**.

If you need to perform some side effects based on state changes, [useUpdateEffect](http://sheinsight.github.io/react-use/reference/use-update-effect) is preferred over this method.

```tsx
const count = store.useSnapshot(s => s.count);

// Execute side effects when count changes
useUpdateEffect(() => {
  console.log('Count has changed', count);
}, [count]);
```

```tsx
store.useSnapshot(listener, options?);

// Usage example, prefer using useUpdateEffect
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

Related type definitions:

```tsx
export interface WithUseSubscribeContributes<State extends object> {
  /**
   * Subscribe to changes in the Store within React components.
   *
   * @param listener - The subscription callback function.
   * @param notifyInSync - Whether to notify updates synchronously, default is false, for asynchronous batch updates enhancing performance.
   */
  useSubscribe: (listener: SubscribeListener<State>, notifyInSync?: boolean) => void
}
```

## store.restore {#store-restore}

Restore the Store to its initial state.

```tsx
store.restore();
```
