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

## Try it Online

You can try Reactive online on [CodeSandbox](https://githubbox.com/sheinsight/reactive/tree/main/examples/basic).

## Example of React

Here is a simple example of using Reactive in a React application.

```tsx
import { create } from '@shined/reactive'

const store = create({ count: 1 })

function App() {
  const count = store.useSnapshot((s) => s.count)

  return (
    <div>
      <p>Count is {count}</p>
      <button onClick={() => store.mutate.count++}>increment</button>
    </div>
  )
}
```

For more information, see [React Usage](/usage/react) or [API Reference](/reference/root).

## Mutate Freely, Consume Safely

Reactive adopts a **read-write separation** approach, offering a straightforward way to mutate the state through the `store.mutate` object. When you need to change the state, simply alter it!

```tsx
export function increment() {
  store.mutate.count++
}

export function updateUserInfo() {
  store.mutate.user.info = { name: 'Alice' }
}
```

For consumption, it provide a simple method of accessing state via `useSnapshot()` in React and `getSnapshot()` in Vanilla JS to ensure security. This approach generates non-extensible snapshot states to prevent accidental modifications.

```tsx
// in React component
const count = store.useSnapshot((s) => s.count)
const { count } = store.useSnapshot()

// in vanilla JavaScript/TypeScript
import { getSnapshot } from '@shined/reactive/vanilla'
const { count } = getSnapshot(store.mutate)
```

## Optional Render Optimization

Furthermore, Reactive provides an optional render optimization feature.

```tsx
// only re-render when `count` changes
const count = store.useSnapshot((s) => s.count)
```

You can use `selector` to specify the state you want to listen to, which will only re-render when the specified state changes. By default, component that has used whole snapshot will trigger a re-render when any part of the state changes if you don't specify the `selector`.

::: details Click to see example

```tsx
import { create } from '@shined/reactive'

const store = create({
  name: 'Bob',
  age: 18,
  hobbies: ['swimming', 'running'],
  address: {
    city: {
      name: 'New York',
    },
  },
})

function App() {
  // re-render when ANY part of the state changes
  const state = store.useSnapshot()

  // only re-render when `city` object changes
  const { name: cityName } = store.useSnapshot((s) => s.address.city)

  // only re-render when `hobbies` object changes
  const [hobby1, hobby2] = store.useSnapshot((s) => s.hobbies)

  // only re-render when `name` changes
  const name = store.useSnapshot((s) => s.name)

  return <div>{name}</div>
}

export default App
```

:::
