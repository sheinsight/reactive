# Use Reactive in React

## Step 1: Create a Store \{#step-1-create-a-store}

Create a store with an initial state using the `create` API. It is recommended to create it outside component code for better code separation. For example, create and export it in `store.ts`, and keep it in the same directory with your `index.tsx` component code for easy import.

::: tip Tip
**A `store` can be either global or local, depending on your needs.**

If you need a global state, you can place the `store` globally and import it anywhere in your application. If you need a local state, you can create the `store` inside a component directory and import it within the component to maintain the independence of the component logic.
:::

```tsx title="store.ts"
import { create } from '@shined/reactive'

// Create store and specify initial state
export const store = create({
  name: 'Bob',
  info: {
    age: 18,
    hobbies: ['Swimming', 'Running'],
  },
})
```

::: tip Tip
If debugging is required, you can use `devtools` to enable support for Redux DevTools Extension. For details, see [Integration with Redux DevTools](/guide/integrations/redux-devtools).
:::

## Step 2: Get Snapshot from Store \{#step-2-get-snapshot-from-store}

### Inside React Component \{#inside-react-component}

Use the `useSnapshot` Hook exposed by `store` to get a snapshot (`snapshot`) in the component and use it for rendering.

```tsx title="app.ts"
import { store } from './store'

export default function App() {
  // Using snapshot from the store
  const name = store.useSnapshot((s) => s.name)

  return <div>{name}</div>
}
```
::: tip Tip

You can also pass a `selector` function to manually specify the state you need to consume to optimize rendering. For details, see [Optional rendering optimization](/guide/introduction#optional-render-optimization).

```tsx
// All state changes inside the store will trigger re-rendering
const snapshot = store.useSnapshot()

// Only re-render when `name` changes
const name = store.useSnapshot((s) => s.name)
// Only re-render when `name` and `age` change
const [name, age] = store.useSnapshot((s) => [s.name, s.age] as const)
```
:::

::: tip Tip
To improve code readability, you can also define some semantic Hooks within the adjacent store file, like:

```tsx title="store.ts"
export const useName = () => store.useSnapshot((s) => s.name)
```

Then use it in the component as shown below.

```tsx title="app.ts"
function App() {
  const name = useName()

  return <div>{name}</div>
}
```
:::

### Outside React Component \{#outside-react-component}

For reading the state only, you can directly read the `store.mutate` object while adhering to the immutable principle.

```tsx
// Read primitive types directly
const userId = store.mutate.userId
// For reference types, create a derivative object based on the existing `store.mutate` to adhere to the immutable principle
const namesToBeConsumed = store.mutate.list.map((item) => item.name);
```

The above method covers most cases. If you really need to get a snapshot outside of components, you can use `getSnapshot()`.

```tsx
import { getSnapshot } from '@shined/reactive'

const { name } = getSnapshot(store.mutate)
```

## Step 3: Mutate the Store Anywhere \{#step-3-mutate-the-store-anywhere}

You can use `store.mutate` to change the state anywhere, and Reactive will automatically trigger re-rendering.

::: warning Important

Reactive employs a **read-write separation** strategy. A snapshot (`Snapshot`) is considered a "snapshot state" at a certain stage and is **not extensible**. You can only alter the state by modifying the `store.mutate` object to create a new snapshot, adhering to the immutable design principle.

```tsx
const info = store.useSnapshot((s) => s.info)
// Do not do this, as the snapshot is read-only and you should modify the state through `store.mutate`
info.name = 'Alice' // ❌
```
:::

### Mutate State in Component \{#mutate-state-in-component}

```tsx 
import { store } from './store'

export default function App() {
  const name = store.useSnapshot((s) => s.name)
  const updateName = () => store.mutate.name = 'Lily'

  return (
    <div>
      <h1>Name: {name}</h1>
      <button onClick={updateName}>Change Name</button>
    </div>
  )
}

```

### Mutate State Outside Component \{#mutate-state-outside-component}

You can also extract the logic of changing the state into the `store` file for reuse.

```tsx title="store.ts"
import { create, devtools } from '@shined/reactive'

export const store = create({
  name: 'Bob',
  data: null,
})

// Define method to change name
export const changeName = () => {
  store.mutate.name = 'Squirtle'
}

// Define method to fetch data
export const fetchData = async () => {
  const data = await fetch('https://api.example.com/data')
  store.mutate.data = await data.json()
}
```

Then use these methods in the component.

```tsx title="app.ts"
import { useAsyncFn } from '@shined/react-use'
import { store, changeName, fetchData } from './store'

export default function App() {
  const [name, data] = store.useSnapshot((s) => [s.name, s.data] as const)
  the fetchDataFn = useAsyncFn(fetchData)

  return (
    <div>
      <h1>Name: {name}, Data: {data}</h1>
      <button onClick={changeName}>Change Name</button>
      <button disabled={fetchDataFn.loading} onClick={fetchDataFn.run}>Fetch Data</button>
    </div>
  )
}
```

## Step 4: Restore to Initial State \{#step-4-restore-to-initial-state}

If needed, you can easily **restore** to the initial state with `store.restore()`, such as resetting the state when the component is unmounted.

`store.restore()` uses the newer [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API. If needed, consider adding a [polyfill](https://github.com/ungap/structured-clone).

```tsx
import { useUnmount } from '@shined/react-use'
import { store } from './store'

export default function App() {
  useUnmount(store.restore)

  return (
    <div>
      <button onClick={store.restore}>Reset</button>
    </div>
  )
}
```
