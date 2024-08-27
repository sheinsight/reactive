# create {#create}

创建一个包含 Hooks 的 Store，适用于 React 应用，内置了 [withSubscribe](#)、[withUseSubscribe](#)、[withSnapshot](#) 和 [withUseSnapshot](#) 增强器，如果你在寻找一个不包含 Hooks 的 Store，请查看 [createVanilla](/reference/basic/create-vanilla#create-vanilla)。

```tsx
import { create } from '@shined/reactive';

const store = create(initialState, options?);

// 使用示例
const store = create({ count: 0});

// store.mutate
// store.restore()

// store.useSnapshot()
// store.snapshot()
// store.subscribe()
```

相关类型定义：

```tsx
// 目前暂无创建选项
export interface StoreCreateOptions {}
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

获取 Store 的快照，从 `v0.1.5` 版本起可用，由内置的 [withSnapshot](#) 增强器提供支持。

```tsx
store.snapshot(selector?);

// 使用示例
store.snapshot();
store.snapshot(s => s.count);
```

## store.useSnapshot {#store-use-snapshot}

在 React 组件中获取 Store 的快照，由内置的 [withUseSnapshot](#) 增强器提供支持。


```tsx
store.useSnapshot(selector?);
store.useSnapshot(options?);
store.useSnapshot(selector?, options?);

// 使用示例
store.useSnapshot();
store.useSnapshot(s => s.count);
store.useSnapshot({ sync: true });
store.useSnapshot(s => s.inputValue, { sync: true });
```

相关类型定义：

```tsx
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
   * Custom equality function to compare the previous and next state slices.
   * 
   * @defaultValue Object.is
   */
  isEqual?: (a: StateSlice, b: StateSlice) => boolean
}

export type SnapshotSelector<State, StateSlice> = (state: State) => StateSlice
```

## store.subscribe {#store-subscribe}

订阅 Store 的变化，由内置的 [withSubscribe](#) 增强器提供支持，**除非必要，否则不推荐直接使用**。

```tsx
store.subscribe(listener, notifyInSync?, selector?);

// 使用示例
store.subscribe(s => {
  console.log(s.count);
});
store.subscribe(s => {
  console.log(s.count);
}, true);
```

## store.useSubscribe {#store-use-subscribe}

在 React 组件中订阅 Store 的变化，由内置的 [withUseSubscribe](#) 增强器提供支持，**除非必要，否则不推荐直接使用**。

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

## store.restore {#store-restore}

恢复 Store 到初始状态。

```tsx
store.restore();
```
