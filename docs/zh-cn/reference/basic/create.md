# create {#create}

创建一个包含 Hooks 的 Store，适用于 React 应用，内置了 [withSubscribe](/guide/enhancers/builtins/with-subscribe)、[withUseSubscribe](/guide/enhancers/builtins/with-use-subscribe)、[withSnapshot](/guide/enhancers/builtins/with-snapshot) 和 [withUseSnapshot](/guide/enhancers/builtins/with-use-snapshot) 增强器，如果你正在寻找一个不包含 Hooks 的 Store，请查看 [createVanilla](/reference/basic/create-vanilla#create-vanilla)。

```tsx
import { create } from '@shined/reactive';

const store = create(initialState);

// 使用示例
const store = create({ count: 0});

store.mutate
store.restore()

store.snapshot()
store.useSnapshot()
store.subscribe()
store.useSubscribe()
```

## store.mutate {#store-mutate}

代理状态，与初始值的对象类型相同，可以通过修改此对象来改变 Store 的状态。

```tsx
// 使用示例
store.mutate.count = 1;
store.mutate.count += 1;
store.mutate.inputValue = 'Hello';
store.mutate.info = { name: 'Shined', age: 18 };
store.mutate.info.hobbies.push('Coding');
```

## store.snapshot {#store-snapshot}

获取 Store 的快照，从 `v0.2.0` 版本起可用，由内置的 [withSnapshot](/guide/enhancers/builtins/with-snapshot) 增强器提供支持。

```tsx
const snapSlice = store.snapshot(selector?);

// 使用示例
const snap = store.snapshot();
const count = store.snapshot(s => s.count);
```

相关类型定义：

```tsx
export interface WithSnapshotContributes<State extends object> {
  /**
   * 获得状态的快照。
   */
  snapshot: <StateSlice = State>(selector?: SnapshotSelector<State, StateSlice>) => StateSlice
}

export type SnapshotSelector<State, StateSlice> = (state: State) => StateSlice
```

## store.useSnapshot {#store-use-snapshot}

在 React 组件中获取 Store 的快照，由内置的 [withUseSnapshot](/guide/enhancers/builtins/with-use-snapshot) 增强器提供支持。


```tsx
store.useSnapshot(selector?);
store.useSnapshot(options?);
store.useSnapshot(selector?, options?);

// 使用示例
const snap = store.useSnapshot();
const count = store.useSnapshot(s => s.count);
const syncSnap = store.useSnapshot({ sync: true });
const syncValue = store.useSnapshot(s => s.inputValue, { sync: true });
```

相关类型定义：

```tsx
export interface WithUseSnapshotContributes<State extends object> {
  /**
   * 获得状态的快照。
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
   * 是否同步通知更新，默认为 false，即异步批量更新，以提高性能。
   * 
   * 在某些场景下（比如输入框使用中文输入法时），需要立即获取最新的状态，此时可以设置为 true。
   * 
   * @defaultValue false
   */
  sync?: boolean
  /**
   * 自定义相等性函数，用于比较前后两个状态片段。
   * 
   * @defaultValue Object.is
   */
  isEqual?: (a: StateSlice, b: StateSlice) => boolean
}
```

## store.subscribe {#store-subscribe}

订阅 Store 的变化，由内置的 [withSubscribe](/guide/enhancers/builtins/with-subscribe) 增强器提供支持，**除非必要，否则不推荐直接使用**。

```tsx
store.subscribe(listener, notifyInSync?, selector?);

// 使用示例
store.subscribe(() => {
  console.log(store.snapshot());
});

const unsubscribe = store.subscribe(() => {
  console.log(store.snapshot());
}, true);

// 取消订阅
unsubscribe()
```

相关类型定义:

```tsx
export interface WithSubscribeContributes<State extends object> {
  /**
   * 订阅 Store 的状态变化。
   *
   * @param listener - 订阅的回调函数。
   * @param sync - 是否同步通知更新，默认为 false，即异步批量更新，以提高性能。
   * @param selector - 选择器，用于选择需要监听的状态片段。
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

在 React 组件中订阅 Store 的变化，在组件 mount 时订阅变更，并在组件卸载时取消订阅，由内置的 [withUseSubscribe](/guide/enhancers/builtins/with-use-subscribe) 增强器提供支持，**除非必要，否则不推荐直接使用**。

如果你需要基于状态变化执行一些副作用，应该首选使用 [useUpdateEffect](http://sheinsight.github.io/react-use/reference/use-update-effect)，而不是此方法。

```tsx
const count = store.useSnapshot(s => s.count);

// 当 count 变化时执行副作用
useUpdateEffect(() => {
  console.log('Count has changed', count);
}, [count]);
```

```tsx
store.useSnapshot(listener, options?);

// 使用示例，请优先考虑使用 useUpdateEffect
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

相关类型定义：

```tsx
export interface WithUseSubscribeContributes<State extends object> {
  /**
   * 在 React 组件中订阅 Store 的变化。
   *
   * @param listener - 订阅的回调函数。
   * @param notifyInSync - 是否同步通知更新，默认为 false，即异步批量更新，以提高性能。
   */
  useSubscribe: (listener: SubscribeListener<State>, notifyInSync?: boolean) => void
}
```

## store.restore {#store-restore}

恢复 Store 到初始状态。

```tsx
store.restore();
```
