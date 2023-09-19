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
  // const state = useSnapshot(store);

  return (
    <>
      <h1>{state.name}</h1>
    </>
  );
}
```

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

## FAQ

### ❓ TS type error, `readonly` type can not be assigned to mutable type

This error commonly occurs when using [shineout](https://github.com/sheinsight/shineout), [antd](https://github.com/ant-design/ant-design) or other UI component libraries and passing the `snapshot` to the component props, but the props type can not accept `readonly` type.

To resolve this type issue, add following line to your **global types file**, such as `global.d.ts` or others, and you can head to [PR#8](https://github.com/sheinsight/reactive/pull/8) for more details.

```ts
// add this typescript `triple-slash directive` to hack type
/// <reference types="@shined/reactive/hack-remove-readonly" />
```

### ❓ Accidentally changed the props value in React component passed by parent components, which is frozen snapshot

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
  const state = useMutableState(store.mutate);

  // `AccidentallyChangePropsInsideComponent` will change the props value
  return <AccidentallyChangePropsInsideComponent prop={state} />;
}
```

## Examples

- [base-example](https://stackblitz.com/edit/vitejs-vite-zli31f?file=src%2Fmain.tsx)
- [multi-store-example](https://stackblitz.com/edit/vitejs-vite-n5azuk?file=src%2Fmain.tsx)

## License

- [MIT](./LICENSE)
