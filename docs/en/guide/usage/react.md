# Use Reactive in React {#use-reactive-in-react}

## Step 1: Create a Store {#step-1-create-a-store}

Create a `store` with an initial state using the `create` API. It is recommended to create outside the component code for better code separation. For example, create and export in `store.ts` and put it in the same directory as your `index.tsx` component code for easy import.

::: tip Tips

**`store` can be global or local, depending on your needs.**

- If you need a global state, you can place the `store` globally and then import it anywhere in your application.
- If you need a local state, you can create a `store` within the component directory and then import it for use within the component to maintain the independence of the component logic.
- If neither scenario fits your situation, you may also consider using a lighter component-level Hooks solution [useReactive](/reference/basic/use-reactive).

:::

Please ensure that the state within `store` is always a `Pure Object`, without functions, class instances, and other non-structural data. If needed, consider using [ref](/reference/advanced/ref).

```tsx title="store.ts"
import { create } from '@shined/reactive'

// Create a store and specify the initial state, the state needs to be a `Pure Object`
export const store = create({
  name: 'Bob',
  info: {
    age: 18,
    hobbies: ['Swimming', 'Running'],
  },
})
```

::: tip Tips
If you need debugging, you can use `devtools` to enable support for Redux DevTools Extension, see [Integration with Redux DevTools](/guide/integrations/redux-devtools) for details.
:::

## Step 2: Get Snapshot from Store {#step-2-get-snapshot-from-store}

### Inside the React Component {#inside-react-component}

Use the `useSnapshot` Hook exposed by `store` to obtain a snapshot (`snapshot`) in the component and use it for rendering.

```tsx title="app.ts"
import { store } from './store'

export default function App() {
  // Use the snapshot in the store
  const name = store.useSnapshot((s) => s.name)
  return <div>{name}</div>
}
```

You can also pass in a `selector` function to manually specify the state you need to consume to optimize rendering, see [Optional Rendering Optimization](/guide/introduction#optional-render-optimization) for details.

```tsx
// All state changes in the store will trigger re-render
const snapshot = store.useSnapshot()

// Only re-render when `name` changes
const name = store.useSnapshot((s) => s.name)
// Only re-render when both `name` and `age` change
const [name, age] = store.useSnapshot((s) => [s.name, s.age] as const)
```

::: tip Tips

In complex state scenarios, for better code readability, you can also define some semantic Hooks within the adjacent store file for use, such as:

```tsx title="store.ts"
// Define semantic Hooks
export const useName = () => store.useSnapshot((s) => s.name)

// Then use it in the component
function App() {
  const name = useName()
  return <div>{name}</div>
}
```

:::

### Outside the React Component {#outside-react-component}

If you just need to read the state, you can directly read the `store.mutate` object while following the `immutable` principle.

```tsx
// For basic data types, read directly
const userId = store.mutate.userId
// For reference types, create a derivative object based on the existing `store.mutate`, to follow the `immutable` principle
const namesToBeConsumed = store.mutate.list.map((item) => item.name);
```

The above method covers most scenarios. If you really need to get a snapshot outside the component, you can use `store.snapshot()`.

```tsx
// From version 0.2.0
const { name } = store.snapshot()

// Version 0.1.4 and earlier
import { getSnapshot } from '@shined/reactive'
const { name } = getSnapshot(store.mutate)
```

## Step 3: Mutate the Store Anywhere {#step-3-mutate-the-store-anywhere}

You can use `store.mutate` to change the state anywhere, Reactive will automatically trigger re-render.

::: warning Important

Reactive employs a **read-write separation** strategy. A snapshot (`Snapshot`) is considered a "snapshot state" of a certain stage and is **non-expandable**. You can only change the state by modifying the `store.mutate` object to generate a new snapshot, following the `immutable` design principle.

```tsx
const info = store.useSnapshot((s) => s.info)
// Do not do this because the snapshot is read-only, you should change the state through `store.mutate`
info.name = 'Alice' // ❌
```
:::

### Inside the React Component {#mutate-state-in-component}

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

### Outside the React Component {#mutate-state-outside-component}

You can also extract the logic for changing state to the `store` file for reuse.

```tsx title="store.ts"
import { create, devtools } from '@shined/reactive'

export const store = create({
  name: 'Bob',
  data: null,
})

// Define a method to change the name
export const changeName = () => {
  store.mutate.name = 'Squirtle'
}

// Define a method to fetch data
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

## Step 4: Restore to Initial State {#step-4-restore-to-initial-state}

If needed, you can easily **restore** to the initial state through `store.restore()`, for example, resetting the state when the component unmounts.

`store.restore()` uses the newer [structuredClone API](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone), consider adding a [polyfill](https://github.com/ungap/structured-clone) if necessary.

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
