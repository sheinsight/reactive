# 在 React 中使用 Reactive {#use-reactive-in-react}

## 第 1 步：创建一个 Store {#step-1-create-a-store}

使用 `create` API 创建一个带有初始状态的 `store`，推荐在组件代码之外创建，以获得更好的代码拆分。例如，在 `store.ts` 中创建并导出，并和你的 `index.tsx` 组件代码放在同一目录下便于引入。

::: tip 提示
**`store` 可以是全局的，也可以是局部的，这取决于你的需求。**

如果你需要全局状态，可以将 `store` 放在全局下，然后在应用程序的任何地方导入它。如果你需要局部状态，可以在组件目录内创建 `store`，然后在组件内引入使用以保持组件逻辑的独立性。
:::

```tsx title="store.ts"
import { create } from '@shined/reactive'

// 创建 store，并指定初始状态
export const store = create({
  name: 'Bob',
  info: {
    age: 18,
    hobbies: ['游泳', '跑步'],
  },
})
```

::: tip 提示
如何你需要调试，可以使用 `devtools` 来启用 Redux DevTools Extension 支持，详情参考 [与 Redux DevTools 集成](/guide/integrations/redux-devtools)。

```tsx {3}
import { devtools } from '@shined/reactive'

devtools(store)
```

:::

## 第 2 步：从 Store 获取快照（Snapshot） {#step-2-get-snapshot-from-store}

### 在 React 组件内 {#inside-react-component}

使用 `store` 暴露的 `useSnapshot` Hook 在组件中获取快照（`snapshot`），并使用它参与渲染。

```tsx title="app.ts"
import { store } from './store'

export default function App() {
  // 使用 store 中的快照
  const name = store.useSnapshot((s) => s.name)

  return <div>{name}</div>
}
```
::: tip 提示

你也以传入一个 `selector` 函数，手动指定你需要消费的状态，以优化渲染，详情参考 [可选的渲染优化](/guide/introduction#optional-render-optimization)。

```tsx
// store 内的所有状态改变时都会触发重新渲染
const snapshot = store.useSnapshot()

// 仅当 `name` 改变时才重新渲染
const name = store.useSnapshot((s) => s.name)
// 仅当 `name` 和 `age` 改变时才重新渲染
const [name, age] = store.useSnapshot((s) => [s.name, s.age] as const)
```
:::

::: tip 提示
为了提高代码可读性，你也可以在相邻 store 文件内定义一些语意化的 Hooks 来使用，比如：

```tsx title="store.ts"
export const useName = () => store.useSnapshot((s) => s.name)
```

然后在组件中使用，如下所示。

```tsx title="app.ts"
function App() {
  const name = useName()

  return <div>{name}</div>
}
```
:::

### 在 React 组件外 {#outside-react-component}

如果只是为了读取状态，可以在遵循 `immutable` 原则的情况下，直接读取 `store.mutate` 对象即可。

```tsx
// 基础数据类型直接读取
const userId = store.mutate.userId
// 引用类型需要基于现有的 `store.mutate` 创建衍生对象，以遵循 `immutable` 原则
const namesToBeConsumed = store.mutate.list.map((item) => item.name);
```

上述方式覆盖大多数情况，如果你实在需要在组件外获取快照，可以使用 `getSnapshot()`。

```tsx
import { getSnapshot } from '@shined/reactive'

const { name } = getSnapshot(store.mutate)
```

## 第 3 步：在任何地方变更 Store {#step-3-mutate-the-store-anywhere}

你可以使用 `store.mutate` 在任何地方变更状态，Reactive 会自动触发重新渲染。

::: warning 重要

Reactive 采用了一种**读写分离**的策略，快照（`Snapshot`）被认为时某个阶段的「快照状态」，是**不可扩展的**，你只能通过修改 `store.mutate` 对象来变更状态，以生成一份全新的快照，遵循 `immutable` 的设计原则。

```tsx
const info = store.useSnapshot((s) => s.info)
// 禁止这样做，因为快照是只读的，你应该通过 `store.mutate` 来变更状态
info.name = 'Alice' // ❌
```
:::

### 在 React 组件内 {#mutate-state-in-component}

```tsx 
import { store } from './store'

export default function App() {
  const name = store.useSnapshot((s) => s.name)
  const updateName = () => store.mutate.name = 'Lily'

  return (
    <div>
      <h1>名称：{name}</h1>
      <button onClick={updateName}>更改名称</button>
    </div>
  )
}

```

### 在 React 组件外 {#mutate-state-outside-component}

你也可以将变更状态的逻辑提取到 `store` 文件中，以便复用。

```tsx title="store.ts"
import { create, devtools } from '@shined/reactive'

export const store = create({
  name: 'Bob',
  data: null,
})

export const changeName = () => {
  store.mutate.name = 'Squirtle' // 定义更改 name 的方法
}

export const fetchData = async () => {
  const data = await fetch('https://api.example.com/data')
  store.mutate.data = await data.json() // 定义获取数据的方法
}
```

然后在组件中使用这些方法。

```tsx title="app.ts"
import { useAsyncFn } from '@shined/react-use'
import { store, changeName, fetchData } from './store'

export default function App() {
  const [name, data] = store.useSnapshot((s) => [s.name, s.data] as const)
  const fetchDataFn = useAsyncFn(fetchData)

  return (
    <div>
      <h1>名称：{name}，数据：{data}</h1>
      <button onClick={changeName}>更改名称</button>
      <button disabled={fetchDataFn.loading} onClick={fetchDataFn.run}>获取数据</button>
    </div>
  )
}
```

## 第 4 步：恢复到初始状态 {#step-4-restore-to-initial-state}

如果需要，你也可以通过 `store.restore()` 轻松地**恢复**到初始状态，比如在组件卸载时，重置状态。

`store.restore()` 中使用了较新的 [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API，如果有需要，请考虑添加一个 [polyfill](https://github.com/ungap/structured-clone)。

```tsx
import { useUnmount } from '@shined/react-use'
import { store } from './store'

export default function App() {
  useUnmount(store.restore)

  return (
    <div>
      <button onClick={store.restore}>重置</button>
    </div>
  )
}
```

