# Using Reactive in Vanilla JavaScript

## Step 1: Create a Store {#step-1-create-a-store}

Create a `store` with an initial state.

::: tip Hint
**A `store` can be global or local, depending on your needs.**
:::

```ts
import { create } from '@shined/reactive/vanilla'

const store = create({ name: 'Bob' })
```

::: tip Hint
If you need to debug, you can enable Redux DevTools Extension support with `devtools`. See [Integrating with Redux DevTools](/guide/integrations/redux-devtools) for more details.
:::

## Step 2: Subscribe to Store Changes {#step-2-subscribe-store-changes}

Subscribe to the `store` to get notified when the state changes.

```ts
store.subscribe((changes) => {
  // Do something when the state changes, like writing (syncing) `config` to the disk
  console.log(changes)
})
```

## Step 3: Update the State {#step-3-update-state}

Directly modify the `store.mutate` object to update the state within the `store`.

```ts
store.mutate.name = 'Alice'
store.mutate.info = { age: 20 }
store.mutate.info.age = 21
```

## Step 4: Read the State {#step-4-get-snapshot}

If you only need to read the state, you can directly access the `store.mutate` object while adhering to the `immutable` principle.

```ts
// Directly read for primitive data types
const userId = store.mutate.userId
// For reference types, create derived objects based on existing `store.mutate` to follow the `immutable` principle
const namesToBeConsumed = store.mutate.list.map((item) => item.name);
```

This approach covers most scenarios. If you really need to get a snapshot, you can use `getSnapshot()`.

::: warning Important

Reactive adopts a **read-write separation** strategy. A `Snapshot` is considered a "snapshot state" at a certain stage, which is **not extendable**. You can only modify the state by altering the `store.mutate` object, thus generating a new snapshot, in compliance with the `immutable` design principle.

```tsx
const snapshot = getSnapshot(store.mutate)
// Do not do this, as the snapshot is read-only, you should change the state through `store.mutate`
snapshot.name = 'Alice' // ❌
```
:::

```ts
import { getSnapshot } from '@shined/reactive/vanilla'
  
const { name: stateNameToRead } = store.mutate // For reading only
const stateToConsume = getSnapshot(store.mutate) // For both reading and writing
```

## Step 5: Restore to Initial State {#step-5-restore-to-initial-state}

If needed, you can also **restore** to the initial state easily with `store.restore()`, for example, when stopping or resetting logic, to reset the state.

`store.restore()` uses the newer [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API; consider adding a [polyfill](https://github.com/ungap/structured-clone) if needed.
