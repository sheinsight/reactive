# Reactive

<a href="https://npmjs.com/package/@shined/reactive"><img src="https://img.shields.io/npm/v/@shined/reactive.svg" alt="npm package"></a>
<a href="https://pkg-size.dev/@shined/reactive"><img src="https://pkg-size.dev/badge/bundle/17299" title="Bundle size for @shined/reactive"></a>
<a href="https://github.com/sheinsight/reactive/blob/main/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/%40shined%2Freactive"></a>

> ⚛️ Proxy-driven state for React & Vanilla JS, flexible, unopinionated, written in TypeScript.

## Features

- 😊 **User-Friendly**: Straightforward API for easy adoption.
- ⚡️ **Optimized Performance**: Leverages [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for efficient rendering.
- 🏄 **Versatile**: Designed for high adaptability in both React and Vanilla JS.
- 🔒 **Safe**: Ensures immutability with non-extensible `snapshot`.
- 🛠️ **DevTools Integration**: Out-of-the-box [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) compatibility.

## Install

```bash
# npm
npm i @shined/reactive
# yarn
yarn add @shined/reactive
# pnpm
pnpm add @shined/reactive
```

## Usage

### Step 1. Create a store

```jsx
import { create, devtools } from '@shined/reactive'

const store = create({ name: 'Pikachu' })

// you can also enable DevTools for debugging
devtools(store, { name: 'pikachu' })
```

> [!NOTE]
> To enable DevTools, make sure you've installed Redux DevTools [Browser Extension](https://github.com/reduxjs/redux-devtools#redux-devtools), full DevTools options can be found at Redux DevTools extension [documentation](https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Arguments.md#options).

### Step 2. Get snapshot from store

```jsx
import { store } from './store'

export default function Foo() {
  const name = store.useSnapshot((s) => s.name)

  return <h1>{name}</h1>
}
```

> [!TIP]
> If state is consumed by `input` element, an exception may occur while typing Chinese, You can use the `sync` option in `useSnapshot` to solve this problem. see [FAQs](#FAQs) for more details.

### Step 3. Mutate the store anywhere

You can mutate the state anywhere you like. For example, mutate it in the same file directly.

> [!IMPORTANT]
> Snapshots are **non-extensible**, you can only mutate state by modify `store.mutate` object.

```jsx
import { create } from '@shined/reactive'

const store = create({
  name: 'Pikachu',
})

const changeName = () => {
  store.mutate.name = 'Squirtle'
}
```

Or mutate in components directly.

```jsx
import { store } from './store'

export default function Foo() {
  const snap = store.useSnapshot()

  function handleClick() {
    // ❌ Error, changes in snapshot will not trigger re-render
    // snap.name = "Squirtle";

    // ✅ Works, you should always mutate the `store.mutate` object
    store.mutate.name = 'Squirtle'
  }

  return (
    <>
      <h1>{snap.name}</h1>
      <button onClick={handleClick}>mutate name</button>
    </>
  )
}
```

You can also easily **restore** to initial state.

> The newer [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API is used in this function, so consider adding a [polyfill](https://github.com/ungap/structured-clone) if needed.

```jsx
import { store } from './store'

export default function Foo() {
  const name = store.useSnapshot((s) => s.name)

  return (
    <>
      <h1>{name}</h1>
      <button onClick={store.restore}>restore</button>
    </>
  )
}
```

## FAQs

<details>
<summary>❓ How to store unproxied state in reactive</summary>

A ref is useful in the rare instances you to nest an object in a proxy that is not wrapped in an inner proxy and, therefore, is not tracked.

```jsx
import { create } from '@shined/reactive'

const store = create({
  users: [
    {
      id: 1,
      name: 'Pikachu',
      component: ref({ table: null }),
    },
  ],
})
```

Once an object is wrapped in a ref, it should be mutated without resetting the object or rewrapping in a new ref.

```jsx
// do mutate
store.mutate.users[0].component.table = document.querySelector('#table')
// do reset
store.mutate.users[0].component.table = null

// don't ❌
store.mutate.users[0].component = {}
```

**Typical application scenarios**: share an instance of a component among multiple components in order to call imperative APIs.

> Once you use ref to wrap an object, the object will not follow the reactive rendering rules, and reactive will not collect dependencies of that object. At the same time, it will not listen to changes on that object. Therefore, you cannot reassign a ref object but can modify its properties. You also cannot reset it to a non-ref object.

</details>

<details>
<summary>❓ When passing state to `input` element, an exception occurred while typing Chinese</summary>

State mutations are batched synchronously by default before triggering re-render to optimize rendering. If you want to disable it (such as consumed by `<input>` element), you can set `sync` option to `true` when creating snapshot to avoid this issue.

```tsx
const snapshot = store.useSnapshot({ sync: true })
```

</details>

## Online Example

- [Basic](https://githubbox.com/sheinsight/reactive/tree/main/examples/basic)
- [Full Featured](https://githubbox.com/sheinsight/reactive/tree/main/examples/full-featured)

## License

- [MIT](./LICENSE)
