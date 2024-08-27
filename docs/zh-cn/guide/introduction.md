# 什么是 Reactive？{#what-is-reactive}

<a href="https://npmjs.com/package/@shined/reactive"><img src="https://img.shields.io/npm/v/@shined/reactive.svg" alt="npm 包"></a>
<a href="https://pkg-size.dev/@shined/reactive"><img src="https://pkg-size.dev/badge/bundle/17299" title="Bundle size for @shined/reactive"></a>
<a href="https://github.com/sheinsight/reactive/blob/main/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/%40shined%2Freactive"></a>

⚛️ Reactive 是一个为 JavaScript 应用程序提供状态管理功能的库，它拥有许多特性使得它易用又强大。

- **🧩 使用灵活**：想要改变存储状态？随时随地通过 [mutate](/reference/vanilla#create-returns-mutate) 修改就好。
- **😊 用户友好**：通过 [create](/reference/root#create) 方法覆盖超过 80% 的使用场景。
- **⚡️ 性能优化**：利用 [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 尽可能提供最佳性能。
- **🏄 框架无关**：在 [React](https://react.dev/) 和纯 JavaScript 中都能良好工作。
- **🦄 TypeScript 支持**：用 [TypeScript](https://www.typescriptlang.org/) 编写，完全类型化，更好的开发体验。
- **🛠️ DevTools 集成**：开箱即用的 [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) 兼容性。

## React 使用示例 \{#react-example}

这里是一个在 React 应用程序中使用 Reactive 的简单示例。

```tsx
import { create } from '@shined/reactive'

const store = create({ count: 1 })
const addOne = () => store.mutate.count++

function App() {
  const count = store.useSnapshot((s) => s.count)

  return (
    <div>
      <p>计数为 {count}</p>
      <button onClick={addOne}>增加</button>
    </div>
  )
}
```

更多信息，请参阅 [React 用法](/usage/react) 或 [API 参考](/reference/root)。

## 在线尝试 \{#try-it-online}

你可以在 [CodeSandbox](https://githubbox.com/sheinsight/reactive/tree/main/examples/basic) 上在线尝试 Reactive。

## 自由变更，安全消费 \{#free-mutate-safe-consume}

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

## 可选的渲染优化 \{#optional-render-optimization}

此外，Reactive 还提供了一个可选的渲染优化功能。

```tsx
// 只有当 `count` 改变时才重新渲染
const count = store.useSnapshot((s) => s.count)
```

你可以使用 `selector` 来指定你想要监听的状态，这将只在指定的状态改变时才重新渲染。

如果不指定，默认情况下，使用了完整快照的组件会在状态的任何部分发生改变时，触发组件的重新渲染。

::: tip 提示
关于 `selector` API 的设计，以及为什么放弃「自动依赖收集」的方案，可参考 `proxy-compare` 的 [issue#65](https://github.com/dai-shi/proxy-compare/issues/65)。
:::

关于 `selector` 的一个更全的示例：

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

export default function App() {
  // 当 store 的任何部分改变时，将触发重新渲染
  const state = store.useSnapshot()

  // 只有当 store 中的 `city` 对象改变时才重新渲染
  const { name: cityName } = store.useSnapshot((s) => s.address.city)

  // 只有当 store 中的 `hobbies` 对象和 `age` 属性改变时才重新渲染
  const [hobbies, age] = store.useSnapshot((s) => [s.hobbies, s.age] as const)

  // 只有当 store 中的 `name` 改变时才重新渲染
  const name = store.useSnapshot((s) => s.name)

  return <div>{name}</div>
}
```
