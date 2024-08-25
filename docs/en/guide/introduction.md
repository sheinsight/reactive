# What is Reactive? {#what-is-reactive}

<a href="https://npmjs.com/package/@shined/reactive"><img src="https://img.shields.io/npm/v/@shined/reactive.svg" alt="npm package"></a>
<a href="https://pkg-size.dev/@shined/reactive"><img src="https://pkg-size.dev/badge/bundle/17299" title="Bundle size for @shined/reactive"></a>
<a href="https://github.com/sheinsight/reactive/blob/main/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/%40shined%2Freactive"></a>

⚛️ Reactive is a state management library for JavaScript applications, offering many features that make it both easy to use and powerful.

- **🧩 Flexible to use**: Want to change store state? Just [mutate](/reference/vanilla#create-returns-mutate) it anywhere you want.
- **😊 User-Friendly**: Cover over 80% of the use cases with [create](/reference/root#create) method.
- **⚡️ Optimized Performance**: Leverages [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to provide the best performance.
- **🏄 Unopinionated**: Works well both in [React](https://react.dev/) and Vanilla JS.
- **🦄 TypeScript Support**: Written in [TypeScript](https://www.typescriptlang.org/), fully typed, better DX.
- **🛠️ DevTools Integration**: Out-of-the-box [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) compatibility.

Head over to the [installation](/installation) section to get started.

## React Example \{#react-example}

Here is a simple example of using Reactive in a React application.

```tsx
import { create } from '@shined/reactive'

const store = create({ count: 1 })
const addOne = () => store.mutate.count++

function App() {
  const count = store.useSnapshot((s) => s.count)

  return (
    <div>
      <p>The count is {count}</p>
      <button onClick={addOne}>Increment</button>
    </div>
  )
}
```

For more information, see [React Usage](/usage/react) or [API Reference](/reference/root).

## Try it Online \{#try-it-online}

You can try Reactive online on [CodeSandbox](https://githubbox.com/sheinsight/reactive/tree/main/examples/basic).

## Free Mutation, Safe Consumption \{#free-mutate-safe-consume}

Reactive adopts a **read-write separation** method, providing a direct way to modify the state through the `store.mutate` object. When you need to change the state, just modify it directly!

```tsx
export function increment() {
  store.mutate.count++
}

export function updateUserInfo() {
  store.mutate.user.info = { name: 'Alice' }
}
```

For consumption, it provides a simple way to access the state through React's `useSnapshot()` and vanilla JavaScript/TypeScript's `getSnapshot()`, ensuring safety. This method generates an immutable snapshot state that prevents accidental modification.

```tsx
// In React components
const count = store.useSnapshot((s) => s.count)
const { count } = store.useSnapshot()

// In vanilla JavaScript/TypeScript
import { getSnapshot } from '@shined/reactive/vanilla'
const { count } = getSnapshot(store.mutate)
```

## Optional Rendering Optimization \{#optional-render-optimization}

Furthermore, Reactive also provides an optional rendering optimization feature.

```tsx
// Only re-renders when `count` changes
const count = store.useSnapshot((s) => s.count)
```

You can use a `selector` to specify the state you want to listen to, which will only re-render when the specified state changes.

If not specified, by default, components using the full snapshot will trigger a re-render when any part of the state changes.

::: tip Tip
For the design of the `selector` API, and why the "automatic dependency collection" strategy was abandoned, see [issue#65](https://github.com/dai-shi/proxy-compare/issues/65) of `proxy-compare`.
:::

A more complete example of `selector`:

```tsx
import { create } from '@shined/reactive'

const store = create({
  name: 'Bob',
  age: 18,
  hobbies: ['Swimming', 'Running'],
  address: {
    city: {
      name: 'New York',
    },
  },
})

export default function App() {
  // Re-renders when any part of store changes
  const state = store.useSnapshot()

  // Only re-renders when the `city` object in store changes
  const { name: cityName } = store.useSnapshot((s) => s.address.city)

  // Only re-renders when the `hobbies` object and `age` property in store change
  const [hobbies, age] = store.useSnapshot((s) => [s.hobbies, s.age] as const)

  // Only re-renders when the `name` in store changes
  const name = store.useSnapshot((s) => s.name)

  return <div>{name}</div>
}
```
