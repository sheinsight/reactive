# What is Reactive?

<a href="https://npmjs.com/package/@shined/reactive"><img src="https://img.shields.io/npm/v/@shined/reactive.svg" alt="npm package"></a>
<a href="https://pkg-size.dev/@shined/reactive"><img src="https://pkg-size.dev/badge/bundle/17299" title="Bundle size for @shined/reactive"></a>
<a href="https://github.com/sheinsight/reactive/blob/main/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/%40shined%2Freactive"></a>

⚛️ Reactive is a library to manage state in JavaScript app. It has many features that make it easy to use and powerful.

- **🧩 Flexible**: Wanna to change store state? Just [mutate](/reference/api#mutate) it anywhere you want.
- **😊 User-Friendly**: Cover over 80% of the use cases with [create](/reference/api#create) method.
- **⚡️ Optimized Performance**: Leverages [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to provide the best performance.
- **🏄 Unopinionated**: Works well both in [React](https://react.dev/) and Vanilla JS.
- **🦄 TypeScript**: Written in [TypeScript](https://www.typescriptlang.org/), fully typed, better DX.
- **🛠️ DevTools Integration**: Out-of-the-box [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) compatibility.

Go [installation](/installation) section to get started.

## Write freely, read safely.

It's **read-write-separated**, which provide a freedom and way to change state by modifying the `store.mutate` object. Whenever you want to change state, just modify it!

For read side, it provide a safe way to read state by using `useSnapshot()` in React or `getSnapshot()` in Vanilla JS, which generate non-extensible snapshot state to ensure the state is not modified by mistake.

### Usage Example of React

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

export default App
```

See [React Usage](/useage/react) or [API Reference](/reference/api) for more details.
