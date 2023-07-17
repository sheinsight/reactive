# @shined/reactive

🚀 A proxy-based react state management library , Has high rendering performance.

In the past, we usually needed to manually use the selector method to declaratively optimize our rendering performance. I call this behavior "manual transmission".

Now, let reactive automatically optimize rendering performance for you and experience the era of automatic transmission.

# Install

```bash
# npm
npm i @shined/reactive -S

# pnpm
pnpm i @shined/reactive -S
```

# How to use

```jsx
// create store
import { create } from "@shined/reactive";
const store = create({
  name: "Pikachu",
});

// create component
function App() {
  // get store snapshot
  const snap = store.useSnapshot();
  return (
    <>
      <h1>{snap.name}</h1>
      <button
        onClick={() => {
          store.current.name = "Squirtle";
        }}
      >
        点我
      </button>
    </>
  );
}
```

# example

- [base-example](https://stackblitz.com/edit/vitejs-vite-zli31f?file=src%2Fmain.tsx)
- [multi-store-example](https://stackblitz.com/edit/vitejs-vite-n5azuk?file=src%2Fmain.tsx)
