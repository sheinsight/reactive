# 在 React 中使用 Reactive {#use-reactive-in-react}

## 步骤 1. 创建一个 Store {#step-1-create-a-store}

创建一个带有初始状态的 store。

::: code-group

```jsx [store.ts] {3}
import { create, devtools } from '@shined/reactive'

export const store = create({ name: 'Bob' }) // 创建 store，初始状态包含 name: 'Bob'
```

:::

## 步骤 2. 从 Store 获取快照 {#step-2-get-snapshot-from-store}

从 store 中获取快照，并在你的组件中使用它。

::: code-group

```jsx [app.ts]
import { store } from './store'

export default function App() {
  const name = store.useSnapshot((s) => s.name) // 使用 store 中的快照

  return <h1>{name}</h1>
}
```

```jsx [store.ts]
import { create, devtools } from '@shined/reactive'

export const store = create({ name: 'Bob' }) // 创建 store，初始状态包含 name: 'Bob'
```

:::

## 步骤 3. 在任何地方变更 Store {#step-3-mutate-the-store-anywhere}

你可以在喜欢的任何地方变更状态。Reactive 会自动触发重新渲染。你可以切换代码组来查看如何变更 store。

> [!IMPORTANT] 重要
> 快照是**不可扩展的**，你只能通过修改 `store.mutate` 对象来变更状态。

::: code-group

```tsx [app.ts] {4,11,15,21}
import { store, changeName, mockFetchData } from './store'

export default function App() {
  const [name, data] = store.useSnapshot((s) => [s.name, s.data]) // 使用 store 中的快照

  return (
    <div>
      <h1>名称：{name}</h1>
      <div>数据：{data}</div>

      <button onClick={() => changeName('Lily')}>更改名称</button>

      <button
        onClick={() => {
          store.mutate.name = 'Tesla' // 直接在组件中变更名字
        }}
      >
        也更改名称
      </button>

      <button onClick={mockFetchData}>拉取数据</button>
    </div>
  )
}
```

```jsx [store.ts] {8-10,12-15}
import { create, devtools } from '@shined/reactive'

export const store = create({
  name: 'Bob',
  data: null, // store 初始状态还包含一个 data 字段
})

export const changeName = () => {
  store.mutate.name = 'Squirtle' // 定义更改 name 的方法
}

export const mockFetchData = async () => {
  await new Promise((r) => setTimeout(r, 1000)) // 模拟异步请求数据
  store.mutate.data = 'Data from server' // 将从服务器得到的数据存到 store
}
```

:::

你也可以通过 `store.restore()` 轻松地**恢复**到初始状态。

> [!TIP] 提示
> 在 `store.restore()` 中使用的是较新的 [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API，如果有需要，考虑添加一个 [polyfill](https://github.com/ungap/structured-clone)。
