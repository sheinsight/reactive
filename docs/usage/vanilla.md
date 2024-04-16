# Use Reactive in Vanilla

## Step 1. Create A Store

Create a store with initial state.

```tsx [store.ts] {3}
import { create, devtools } from '@shined/reactive'

export const store = create({ name: 'Bob' })
```

## Step 2. Subscribe Listeners

Subscribe to store to get notified when state changes.

```tsx [app.ts] {3-5}
import { store } from './store'

store.subscribe((changes) => {
  // do something when state changes
  // such as, writing (syncing) `config` to disk
  console.log(changes)
})
```

## Step 3. Get Snapshot from Store (optional)

Get a snapshot from the store and use it in your components.

```tsx [app.ts] {1,6,7}
import { getSnapshot } from '@shined/reactive/vanilla'
import { store } from './store'

store.subscribe((changes) => {
  console.log(changes)
  const { name: stateNameToRead } = store.mutate // for read only
  const stateToConsume = getSnapshot(store.mutate) // for read and write
})
```

> [!TIP]
> If you just want to read the state, not mutate it, you can read `store.mutate` directly.
