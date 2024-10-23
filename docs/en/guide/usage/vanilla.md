# Using Reactive in Vanilla JavaScript {#use-reactive-in-vanilla}

::: tip Tip
In Vanilla scenarios, please import all APIs from `/vanilla`.
:::

## Step 1: Create a Store {#step-1-create-a-store}

Create a `store` with an initial state.

::: tip Tip
**A `store` can be global or local, depending on your needs.**
:::

```ts
import { create } from '@shined/reactive/vanilla'

const store = create({ name: 'Bob' })
```

::: tip Tip
If you need to debug, you can enable Redux DevTools Extension support by using `devtools`. For more details, see [Integrating with Redux DevTools](/guide/integrations/redux-devtools).
:::

## Step 2: Subscribe to Store Changes {#step-2-subscribe-store-changes}

Subscribe to `store` to get notified when state changes.

```ts
store.subscribe((changes) => {
  // Do something when state changes, for example, sync `config` to disk
  console.log(changes)
})
```

## Step 3: Update State {#step-3-update-state}

Directly modify the `store.mutate` object to update the state in `store`.

```ts
store.mutate.name = 'Alice'
store.mutate.info = { age: 20 }
store.mutate.info.age = 21
```

## Step 4: Get Snapshot {#step-4-get-snapshot}

If you just want to read the state, you can directly read the `store.mutate` object while following the `immutable` principle.

```ts
// For primitive data types, read directly
const userId = store.mutate.userId
// For reference types, create derived objects based on the existing `store.mutate` to follow the `immutable` principle
const namesToBeConsumed = store.mutate.list.map((item) => item.name);
```
The above method covers most cases. If you really need to get a snapshot, you can use `store.snapshot()`.

```tsx
// From version 0.2.0
const { name } = store.snapshot()

// For versions 0.1.4 and earlier
import { getSnapshot } from '@shined/reactive'
const { name } = getSnapshot(store.mutate)
```

## Step 5: Restore to Initial State {#step-5-restore-to-initial-state}

If needed, you can also easily **restore** to the initial state using `store.restore()`, for example, when stopping or resetting logic.

`store.restore()` uses the newer [structuredClone API](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone). If necessary, consider adding a [polyfill](https://github.com/ungap/structured-clone).
