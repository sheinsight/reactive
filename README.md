# @shined/reactive

> Unopinionated proxy-based state, with high rendering performance. 🔥

## Features

- 😉 **Easy to use**: just several simple APIs.
- ⚡️ **High performance**: use [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to achieve high rendering
- 🏄‍♂️ **Unopinionated**: works well in both React and Vanilla JS/TS.
- 🔐 **Secure**: `snapshot` can't be mutated directly.
- 💻 **Redux Devtools Support**: partly support [Redux Devtools Extension](https://github.com/reduxjs/redux-devtools#redux-devtools).

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

### 1. Create a store

```jsx
import { create } from "@shined/reactive";

const store = create({
  name: "Pikachu",
});

// or go with devtools enabled, make sure you've installed `redux-devtools-extension`
const store = create(
  {
    name: "Pikachu",
  },
  {
    devtool: {
      name: "Pikachu Store",
      // ... other options here.
    },
  }
);
```

> Full devtools options see [Redux Devtools Extension Documentation](https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Arguments.md#options).

### 2. Get snapshot from store

```jsx
import { store } from "./store";
// import { useSnapshot } from "@shined/reactive";

export default function Foo() {
  const state = store.useSnapshot();

  // or get snapshot by `useSnapshot` hooks
  // const state = useSnapshot(store.mutate);

  return (
    <>
      <h1>{state.name}</h1>
    </>
  );
}
```

> **NOTE** 🔥 🔥 🔥 If passing state to `input` element, an exception occurred while typing Chinese , You can use the `sync` option to solve this problem. see [FAQs](#FAQs) for more details.

### 3. Mutate the store

You can mutate the state anywhere you like.

For example, mutate it in the same file with the store directly.

> NOTE: snapshots are all frozen, so you can only mutate state by modify `store.mutate` object.

```jsx
import { create } from "@shined/reactive";

const store = create({
  name: "Pikachu",
});

const changeName = () => {
  store.mutate.name = "Squirtle";
};
```

Or mutate in components.

```jsx
import { store } from "./store";

export default function Foo() {
  const state = store.useSnapshot();

  function handleClick() {
    // ❌ Error: Cannot mutate frozen object
    state.name = "Squirtle";
    // ✅ Works
    store.mutate.name = "Squirtle";
  }

  return (
    <>
      <h1>{state.name}</h1>
      <button onClick={handleClick}>mutate name</button>
    </>
  );
}
```

You can easily restore to initial state.

> The newer [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API is used in this function, so consider adding a polyfill if needed.

```jsx
import { store } from "./store";

export default function Foo() {
  const state = store.useSnapshot();

  return (
    <>
      <h1>{state.name}</h1>
      <button onClick={() => store.restore()}>restore</button>
    </>
  );
}
```

### 4. Unproxied state in a reactive proxy

A ref is useful in the rare instances you to nest an object in a proxy that is not wrapped in an inner proxy and, therefore, is not tracked.

```jsx
import { create } from "@shined/reactive";

const store = create({
  users: [{ id: 1, name: "Pikachu", component: ref({ table: null }) }],
});
```

Once an object is wrapped in a ref, it should be mutated without resetting the object or rewrapping in a new ref.

```tsx
// do mutate
store.users[0].component.table = document.querySelector("#table");
// do reset
store.users[0].component.table = null;

// don't ❌
store.users[0].component = {};
```

**Typical application scenarios :**

You want to share an instance of a component among multiple components in order to call imperative APIs.

> Once you use ref to wrap an object, the object will not follow the reactive rendering rules, and reactive will not collect dependencies of that object. At the same time, it will not listen to changes on that object. Therefore, you cannot reassign a ref object but can modify its properties. You also cannot reset it to a non-ref object.

## FAQs

<details>
<summary>❓ TS type error, `readonly` type can not be assigned to mutable type</summary>

This error commonly occurs when using [shineout](https://github.com/sheinsight/shineout), [antd](https://github.com/ant-design/ant-design) or other UI component libraries and passing the `snapshot` to the component props, but the props type can not accept `readonly` type.

To resolve this type issue, add following line to your **global types file**, such as `global.d.ts` or others, and you can head to [PR#8](https://github.com/sheinsight/reactive/pull/8) for more details.

```ts
// add this typescript `triple-slash directive` to hack type
/// <reference types="@shined/reactive/hack-remove-readonly" />
```

</details>

<details>
<summary>❓ Cannot mutate the snapshot props in Child components</summary>

The React philosophy is that **props should be immutable and top-down**. So, in principle, you should **NOT** change the props value inside components.

However, if you do need to do this for reasons such as high historical legacy, migration costs and others like these, you can use the following hook to address it, but it is **NOT** recommended to use it widely.

```tsx
import { useEffect, useReducer } from "react";
import { subscribe } from "@shined/reactive";

type PlainObject = Record<PropertyKey, unknown>;

// in TS, if you use JS, you may need to eliminate the type
const useMutableState = <T extends PlainObject>(proxyObj: T) => {
  const [, forceUpdate] = useReducer((c: number) => c + 1, 0);
  useEffect(() => subscribe(proxyObj, forceUpdate), [proxyObj]);
  return proxyObject as T;
};

export function Foo(props) {
  // use `useMutableState` to get mutable state instead of `useSnapshot`
  const mutableState = useMutableState(store.mutate);

  // `ChangePropsInside` will change the props value
  return <ChangePropsInside props={mutableState} />;
}
```

</details>

<details>
<summary>❓ Unrelated changes to the state cause component to re-render</summary>

It's intentional, which means it "uses" the entire snapshot object, and will trigger re-render if any changes to state.

```js
// trigger re-render when any state changes
const snapshot = store.useSnapshot();
// same as above
store.useSnapshot();
```

If you don't need this feature, you should **explicitly** access the properties you need.

```js
// this will only trigger re-render when `name` changes.
const snapshot = store.useSnapshot();
snapshot.name; // use `.name` latter.

// same as above
const { name } = store.useSnapshot();
// same as above
const name = useSnapshot(store.mutate.name);
```

</details>

<details>
<summary>❓ When passing state to `input` element, an exception occurred while typing Chinese</summary>

State mutations are batched synchronously by default before triggering re-render to optimize rendering. If you want to disable it (such as consumed by `<input>` element), you can set `sync` option to `true` when creating snapshot to avoid this issue.

```tsx
const snapshot = store.useSnapshot({ sync: true });
```

</details>

## Examples

- [base-example](https://stackblitz.com/edit/vitejs-vite-zli31f?file=src%2Fmain.tsx)
- [multi-store-example](https://stackblitz.com/edit/vitejs-vite-n5azuk?file=src%2Fmain.tsx)

## License

- [MIT](./LICENSE) License.
