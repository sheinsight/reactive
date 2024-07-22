# 在纯 JavaScript 中使用 Reactive {#use-reactive-in-vanilla}

## 第 1 步：创建一个 Store {#step-1-create-a-store}

创建一个带有初始状态的 store。

```tsx [store.ts] {3}
import { create, devtools } from '@shined/reactive/vanilla'

export const store = create({ name: 'Bob' })
```

## 第 2 步：订阅监听器 {#step-2-subscribe-listeners}

订阅 store 以在状态变更时获得通知。

```tsx [app.ts] {3-5}
import { store } from './store'

store.subscribe((changes) => {
  // 当状态变更时做一些事情，比如，将 `config` 写入（同步）到磁盘
  console.log(changes)
})
```

## 第 3 步：从 Store 获取快照（可选） {#step-3-get-snapshot-from-store}

从 store 获取一个快照，并在你的组件中使用它。

```tsx [app.ts] {1,6,7}
import { getSnapshot } from '@shined/reactive/vanilla'
import { store } from './store'

store.subscribe((changes) => {
  console.log(changes)
  const { name: stateNameToRead } = store.mutate // 仅用于读取
  const stateToConsume = getSnapshot(store.mutate) // 读、写均可
})
```

> [!NOTE] 注意
> 如果你只想读取状态，而不修改它，你可以直接读取 `store.mutate`。
