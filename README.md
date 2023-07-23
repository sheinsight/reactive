# @shined/reactive

> `@shined/reactive` proxy-based react state , Has high rendering performance. 🔥

- ⚡️ High rendering performance .
- 😉 Simple API .
- 🏄‍♂️ No dogmatism.
- 🔐 Freeze your snapshot to avoid accidental mutate.

# Install

```bash
# npm
npm i @shined/reactive -S
```

```bash
# yarn
yarn add @shined/reactive -S
```

```bash
# pnpm
pnpm install @shined/reactive -S
```

# How to use

Create Store

```jsx
import { create } from "@shined/reactive";

const store = create({
  name: "Pikachu",
});
```

Get snapshot in the component.

> What needs to be noted is that the obtained snapshots are all frozen, so you cannot mutate.

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

You can mutate the status anywhere.

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

You can easily restore the initial state.

> We used the latest [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone){:target="\_blank"} API. If your target browser version is too low, please ensure that the polyfill is loaded correctly.

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

# example

- [base-example](https://stackblitz.com/edit/vitejs-vite-zli31f?file=src%2Fmain.tsx){:target="\_blank"}
- [multi-store-example](https://stackblitz.com/edit/vitejs-vite-n5azuk?file=src%2Fmain.tsx){:target="\_blank"}
