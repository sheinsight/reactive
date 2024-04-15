# Use Reactive in React

## Step 1. Create a store

Create a store with initial state.

::: code-group

```jsx [store.ts] {3}
import { create, devtools } from '@shined/reactive'

export const store = create({ name: 'Bob' })
```

:::

## Step 2. Get snapshot from store

Get a snapshot from the store and use it in your components.

::: code-group

```jsx [app.ts]
import { store } from './store'

export default function App() {
  const name = store.useSnapshot((s) => s.name)

  return <h1>{name}</h1>
}
```

```jsx [store.ts]
import { create, devtools } from '@shined/reactive'

export const store = create({ name: 'Bob' })
```

:::

## Step 3. Mutate the store anywhere

You can mutate the state anywhere you like. Reactive will automatically trigger re-render. You can switch Code Group to see how to mutate the store.

> [!IMPORTANT]
> Snapshots are **non-extensible**, you can only mutate state by modify `store.mutate` object.

::: code-group

```tsx [app.ts] {4,11,15,21}
import { store, changeName, mockFetchData } from './store'

export default function App() {
  const [name, data] = store.useSnapshot((s) => [s.name, s.data])

  return (
    <div>
      <h1>name: {name}</h1>
      <div>data: {data}</div>

      <button onClick={() => changeName('Lily')}>Change Name</button>

      <button
        onClick={() => {
          store.mutate.name = 'Tesla'
        }}
      >
        Change Name, too
      </button>

      <button onClick={mockFetchData}>Fetch Data</button>
    </div>
  )
}
```

```jsx [store.ts] {8-10,12-15}
import { create, devtools } from '@shined/reactive'

export const store = create({
  name: 'Bob',
  data: null,
})

export const changeName = () => {
  store.mutate.name = 'Squirtle'
}

export const mockFetchData = async () => {
  await new Promise((r) => setTimeout(r, 1000))
  store.mutate.data = 'Data from server'
}
```

:::

You can also easily **restore** to initial state via `store.restore()`

> The newer [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API is used in this function, so consider adding a [polyfill](https://github.com/ungap/structured-clone) if needed.
