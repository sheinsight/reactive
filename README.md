# @shined/reactive

> Unopinionated proxy-based state, with high rendering performance. 🔥

## Contents

- [@shined/reactive](#shinedreactive)
  - [Contents](#contents)
  - [Features](#features)
  - [Install](#install)
  - [Usage](#usage)
    - [1. Create a store](#1-create-a-store)
    - [2. Get snapshot from store](#2-get-snapshot-from-store)
    - [3. Mutate the store](#3-mutate-the-store)
  - [Examples](#examples)
  - [License](#license)

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
    },
  }
);
```

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

## Examples

- [base-example](https://stackblitz.com/edit/vitejs-vite-zli31f?file=src%2Fmain.tsx)
- [multi-store-example](https://stackblitz.com/edit/vitejs-vite-n5azuk?file=src%2Fmain.tsx)

## License

- [MIT](LICENSE)
