# 什么是 Reactive？{#what-is-reactive}

<a href="https://npmjs.com/package/@shined/reactive"><img src="https://img.shields.io/npm/v/@shined/reactive.svg" alt="npm 包"></a>
<a href="https://pkg-size.dev/@shined/reactive"><img src="https://pkg-size.dev/badge/bundle/17299" title="Bundle size for @shined/reactive"></a>
<a href="https://github.com/sheinsight/reactive/blob/main/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/%40shined%2Freactive"></a>

⚛️ Reactive 是一个为 JavaScript 应用程序提供的状态管理库，它拥有许多特性，使得它既易于使用又功能强大。

- **🧩 灵活使用**：想要改变存储状态？随时随地通过 [mutate](/zh-cn/reference/vanilla-api#create-returns-mutate) 修改就好。
- **😊 用户友好**：通过 [create](/zh-cn/reference/root-api#create) 方法覆盖超过 80% 的使用场景。
- **⚡️ 优化性能**：利用 [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 提供最佳性能。
- **🏄 无偏见性**：在 [React](https://react.dev/) 和纯 JavaScript 中都能良好工作。
- **🦄 TypeScript 支持**：用 [TypeScript](https://www.typescriptlang.org/) 编写，完全类型化，更好的开发体验。
- **🛠️ DevTools 集成**：开箱即用的 [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) 兼容性。

前往 [安装](/zh-cn/installation) 部分开始使用。

## 在线尝试

你可以在 [CodeSandbox](https://githubbox.com/sheinsight/reactive/tree/main/examples/basic) 上在线尝试 Reactive。

## React 示例

这里是一个在 React 应用程序中使用 Reactive 的简单示例。

```tsx
import { create } from '@shined/reactive'

const store = create({ count: 1 })

function App() {
  const count = store.useSnapshot((s) => s.count)

  return (
    <div>
      <p>计数为 {count}</p>
      <button onClick={() => store.mutate.count++}>增加</button>
    </div>
  )
}
```

更多信息，请参阅 [React 用法](/zh-cn/usage/react) 或 [API 参考](/zh-cn/reference/root-api)。

## 自由变更，安全消费

Reactive 采用了 **读写分离** 的方法，通过 `store.mutate` 对象提供了一种直接变更状态的方式。当需要改变状态时，直接修改即可！

```tsx
export function increment() {
  store.mutate.count++
}

export function updateUserInfo() {
  store.mutate.user.info = { name: 'Alice' }
}
```

对于消费，它通过 React 部分的 `useSnapshot()` 和纯 JavaScript 部分的 `getSnapshot()` 提供了一个访问状态的简单方法，以确保安全。这种方法生成的非扩展快照状态防止了意外修改。

```tsx
// 在 React 组件中
const count = store.useSnapshot((s) => s.count)
const { count } = store.useSnapshot()

// 在 vanilla JavaScript/TypeScript 中
import { getSnapshot } from '@shined/reactive/vanilla'
const { count } = getSnapshot(store.mutate)
```

## 可选的渲染优化

此外，Reactive 还提供了一个可选的渲染优化功能。

```tsx
// 只有当 `count` 改变时才重新渲染
const count = store.useSnapshot((s) => s.count)
```

你可以使用 `selector` 来指定你想要监听的状态，这将只在指定的状态改变时才重新渲染。如果你不指定 `selector`，默认情况下，使用了完整快照的组件会在任何部分的状态改变时触发重新渲染。

::: details 点击查看示例

```tsx
import { create } from '@shined/reactive'

const store = create({
  name: 'Bob',
  age: 18,
  hobbies: ['游泳', '跑步'],
  address: {
    city: {
      name: '纽约',
    },
  },
})

function App() {
  // 当任何部分的状态改变时重新渲染
  const state = store.useSnapshot()

  // 只有当 `city` 对象改变时才重新渲染
  const { name: cityName } = store.useSnapshot((s) => s.address.city)

  // 只有当 `hobbies` 对象改变时才重新渲染
  const [hobby1, hobby2] = store.useSnapshot((s) => s.hobbies)

  // 只有当 `name` 改变时才重新渲染
  const name = store.useSnapshot((s) => s.name)

  return <div>{name}</div>
}

export default App
```

:::
