# 在纯 JavaScript 中使用 Reactive {#use-reactive-in-vanilla}

## 第 1 步：创建一个 Store {#step-1-create-a-store}

创建一个带有初始状态的 `store`。

::: tip 提示
**`store` 可以是全局的，也可以是局部的，这取决于你的需求。**
:::

```ts
import { create } from '@shined/reactive/vanilla'

const store = create({ name: 'Bob' })
```

::: tip 提示
如何你需要调试，可以使用 `devtools` 来启用 Redux DevTools Extension 支持，详情参考 [与 Redux DevTools 集成](/guide/integrations/redux-devtools)。
:::

## 第 2 步：订阅状态变更 {#step-2-subscribe-store-changes}

订阅 `store` 以在状态变更时获得通知。

```ts
store.subscribe((changes) => {
  // 当状态变更时做一些事情，比如，将 `config` 写入（同步）到磁盘
  console.log(changes)
})
```

## 第 3 步：更新状态 {#step-3-update-state}

直接修改 `store.mutate` 对象来更新 `store` 中的状态。

```ts
store.mutate.name = 'Alice'
store.mutate.info = { age: 20 }
store.mutate.info.age = 21
```

## 第 4 步：读取状态 {#step-4-get-snapshot}

如果只是为了读取状态，可以在遵循 `immutable` 原则的情况下，直接读取 `store.mutate` 对象即可。

```ts
// 基础数据类型直接读取
const userId = store.mutate.userId
// 引用类型需要基于现有的 `store.mutate` 创建衍生对象，以遵循 `immutable` 原则
const namesToBeConsumed = store.mutate.list.map((item) => item.name);
```

上述方式覆盖大多数情况，如果你实在需要获取快照，可以使用 `getSnapshot()`。

::: warning 重要

Reactive 采用了一种**读写分离**的策略，快照（`Snapshot`）被认为时某个阶段的「快照状态」，是**不可扩展的**，你只能通过修改 `store.mutate` 对象来变更状态，以生成一份全新的快照，遵循 `immutable` 的设计原则。

```tsx
const snapshot = getSnapshot(store.mutate)
// 禁止这样做，因为快照是只读的，你应该通过 `store.mutate` 来变更状态
snapshot.name = 'Alice' // ❌
```
:::

```ts
import { getSnapshot } from '@shined/reactive/vanilla'
  
const { name: stateNameToRead } = store.mutate // 仅用于读取
const stateToConsume = getSnapshot(store.mutate) // 读、写均可
```

## 第 5 步：恢复到初始状态 {#step-5-restore-to-initial-state}

如果需要，你也可以通过 `store.restore()` 轻松地**恢复**到初始状态，比如在停止、重置逻辑时，重置状态。

`store.restore()` 中使用了较新的 [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API，如果有需要，请考虑添加一个 [polyfill](https://github.com/ungap/structured-clone)。
