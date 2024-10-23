# What is Reactive? \{#what-is-reactive}

<a href="https://npmjs.com/package/@shined/reactive"><img src="https://img.shields.io/npm/v/@shined/reactive.svg" alt="npm package"></a>
<a href="https://pkg-size.dev/@shined/reactive"><img src="https://pkg-size.dev/badge/bundle/25441" title="Bundle size for @shined/reactive"></a>
<a href="https://github.com/sheinsight/reactive/blob/main/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/%40shined%2Freactive"></a>

⚛️ Reactive is a library that provides state management capabilities for JavaScript applications, intuitive, flexible, and written in TypeScript.

- **😊 Beginner-Friendly**: Covered more than 80% of use cases with the [create](/reference/basic/create) method.
- **🧩 Flexible Usage**: Want to change the stored state? Just modify it anytime, anywhere through [mutate](/reference/basic/create#store-mutate).
- **⚡️ Performance Optimization**: Utilizes the [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to provide the best possible performance.
- **🏄 Framework Agnostic**: Works well both in [React](https://react.dev/) and Vanilla JavaScript.
- **🦄 TypeScript Support**: Written in [TypeScript](https://www.typescriptlang.org/), fully typed for a better development experience.
- **🛠️ DevTools Integration**: Out-of-the-box compatibility with [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools).

## React Usage Example \{#react-example}

Here's a simple example of using Reactive in a React application.

```tsx
import { create } from '@shined/reactive'

const store = create({ count: 1 })
const addOne = () => store.mutate.count++

function App() {
  const count = store.useSnapshot((s) => s.count)

  return (
    <div>
      <p>Count is {count}</p>
      <button onClick={addOne}>Increase</button>
    </div>
  )
}
```

For more information, please refer to [React Usage](/guide/usage/react) or [API Reference](/reference/basic/create).

## Try It Online \{#try-it-online}

You can try Reactive online on [CodeSandbox](https://githubbox.com/sheinsight/reactive/tree/main/examples/basic).

## Free Mutation, Safe Consumption \{#free-mutate-safe-consume}

Reactive adopts a **read-write separation** strategy, offering a more intuitive way of changing states through the [store.mutate](/reference/basic/create#store-mutate) object. Simply modify the `store.mutate` object when you need to change states!

```tsx
export const store = create({
  count: 1,
  user: { name: 'Bob' }
})

export function increment() {
  store.mutate.count++
}

export function updateUser() {
  store.mutate.user = { name: 'Alice' }
}
```

For consumption, it provides a simple method to access the state through React's [store.useSnapshot](/reference/basic/create#store-use-snapshot) and the pure JavaScript/TypeScript's [store.snapshot](/reference/basic/create#store-snapshot), ensuring safety. This method generates a non-expandable snapshot state to prevent accidental modifications.

```tsx
// In React components
const { count } = store.useSnapshot()
const count = store.useSnapshot((s) => s.count)

// In Vanilla JavaScript/TypeScript
const { count } = store.snapshot()
const count = store.snapshot(s => s.count)
```

## Optional Rendering Optimization \{#optional-render-optimization}

Moreover, Reactive also provides an optional rendering optimization feature.

```tsx
// Only re-renders when `count` changes, `s => s.count` is the selector, used to pick the specified state.
const count = store.useSnapshot((s) => s.count)
```

You can use `selector` to specify the state you want to pick, which will only re-render when the specified state changes. By default, components using the full snapshot will trigger a re-render whenever any part of the state changes.

::: tip Hint
For the design of the `selector` API, and why the "automatic dependency collection" approach was abandoned, refer to `proxy-compare`'s [issue#65](https://github.com/dai-shi/proxy-compare/issues/65).
:::

A more comprehensive example of `selector`:

```tsx
import { create } from '@shined/reactive'

const store = create({
  name: 'Bob',
  age: 18,
  hobbies: ['Swimming', 'Running'],
  address: { city: { name: 'New York' } },
})

export default function App() {
  // Will trigger re-render when any part of the store changes
  const state = store.useSnapshot()

  // Only re-renders when the `city` object in store changes
  const { name: cityName } = store.useSnapshot((s) => s.address.city)

  // Only re-renders when the `hobbies` object and `age` property in store change
  const [hobbies, age] = store.useSnapshot((s) => [s.hobbies, s.age] as const)

  // Only re-renders when the `name` in store changes
  const name = store.useSnapshot((s) => s.name)
}
```
