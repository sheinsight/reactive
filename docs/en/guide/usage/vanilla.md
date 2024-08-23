# Using Reactive in Vanilla JavaScript

## Step 1: Create a Store \{#step-1-create-a-store}

Create a store with an initial state.

```tsx [store.ts]
import { create, devtools } from '@shined/reactive/vanilla'

const store = create({ name: 'Bob' })
```

## Step 2: Subscribe to Store Changes \{#step-2-subscribe-store-changes}

Subscribe to the `store` to get notified when the state changes.

```tsx [app.ts]
store.subscribe((changes) => {
  // Do something when the state changes, for example, writing (synchronizing) `config` to disk
  console.log(changes)
})
```

## Step 3: Get a Snapshot from the Store \{#step-3-get-snapshot-from-store}

Get a snapshot from the `store` and use it in your component.

```tsx [app.ts]
import { getSnapshot } from '@shined/reactive/vanilla'
  
const { name: stateNameToRead } = store.mutate // For reading only
const stateToConsume = getSnapshot(store.mutate) // For both reading and writing
```
