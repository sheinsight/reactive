# @shined/reactive

> unopinionated proxy-based state, with high rendering performance. 🔥

## Features

- 😉 **Easy to use**: just several simple APIs.
- ⚡️ **High performance**: use [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to achieve high rendering
- 🏄‍♂️ **Unopinionated**: works well in both React and Vanilla.
- 🔐 **Secure**: `snapshot` can't be mutated directly.

## Install

```bash
# npm
npm i @shined/reactive -S
# yarn
yarn add @shined/reactive -S
# pnpm
pnpm install @shined/reactive -S
```

## Usage

Create Store

```jsx
import { create } from "@shined/reactive";

const store = create({
  name: "Pikachu",
});
```

Get snapshot

> NOTE: snapshots are all frozen, so you can only mutate state by modify `store.mutate` object.

```jsx
import { store } from "./store";

export default function Children() {
  const state = store.useSnapshot();
  return (
    <>
      <h1>{state.name}</h1>
    </>
  );
}
```

You can mutate the state anywhere you like.

For example, mutate directly in the store.

```jsx
import { create } from "@shined/reactive";

const store = create({
  name: "Pikachu",
});

const changeName = () => {
  store.mutate.name = "Squirtle";
};
```

Or mutate in the component.

> Note that you cannot mutate the snapshot, otherwise an error will be reported.

```jsx
import { store } from "./store";

export default function Children() {
  const state = store.useSnapshot();
  return (
    <>
      <h1>{state.name}</h1>
      <button
        onClick={() => {
          // ❌ Error: Cannot mutate frozen object
          state.name = "Squirtle";
          // ✅ OK
          store.mutate.name = "Squirtle";
        }}
      >
        mutate name
      </button>
    </>
  );
}
```

You can easily restore to initial state.

> The newer [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API is used, consider adding a polyfill if needed.

```tsx
import { store } from "./store";

export default function Children() {
  const state = store.useSnapshot();
  return (
    <>
      <h1>{state.name}</h1>
      <button
        onClick={() => {
          store.restore();
        }}
      >
        restore
      </button>
    </>
  );
}
```

## Examples

- [base-example](https://stackblitz.com/edit/vitejs-vite-zli31f?file=src%2Fmain.tsx)
- [multi-store-example](https://stackblitz.com/edit/vitejs-vite-n5azuk?file=src%2Fmain.tsx)

## License

- [MIT](LICENSE)
