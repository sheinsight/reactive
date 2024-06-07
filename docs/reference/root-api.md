# Root API (exported from `./`) {#root-api}

```tsx
import { create, ref, devtools } from '@shined/reactive'
```

## `create` {#root-create}

A method for React that create a [vanilla store](/reference/vanilla-api#create) with extra React Hook `useSnapshot`. See [create#returns](/reference/vanilla-api#create-returns) in vanilla exports for other properties.

```tsx
const store = create({ count: 1 })

// in React component
const count = store.useSnapshot(s => s.count)
const count = store.useSnapshot(s => s.count, { sync:true })
const { count } = store.useSnapshot()
const { count } = store.useSnapshot({ sync:true })
```

::: details Type Definitions

```tsx
/**
 * example state for `store.useSnapshot()`
 * {
 *   name: 'Bob',
 *   age: 20,
 *   hobbies: ['coding', 'biking'],
 * }
 */

export interface SnapshotOptions<StateSlice> {
  sync?: boolean
  isEqual?: (a: StateSlice, b: StateSlice) => boolean
}

export type Selector<State, StateSlice> = (state: State) => StateSlice

export type StoreUseSnapshot<State> = {
  // const state = store.useSnapshot()
  (): State

  // const state = store.useSnapshot({ sync: true })
  (options: SnapshotOptions<State>): State

  // const name = store.useSnapshot((s) => s.name)
  <StateSlice>(selector: Selector<State, StateSlice>): StateSlice

  // const state = store.useSnapshot(undefined, { sync: true })
  <StateSlice>(selector: undefined, options: SnapshotOptions<StateSlice>): State

  // const age = store.useSnapshot((s) => s.age, { sync: true })
  <StateSlice>(
    selector: Selector<State, StateSlice>,
    options: SnapshotOptions<StateSlice>
  ): StateSlice
}
```

:::

## `ref` {#root-ref}

> Exported directly from `./vanilla`, see [ref](/reference/vanilla-api#ref) in vanilla exports for more.

```tsx
const store = create({ 
  count: 1,
  ref: ref({ tableEl: null as null | HTMLTableElement })
})

store.mutate.ref.tableEl = document.getElementById("#table")

// in React component
const tableEl = store.useSnapshot(s => s.ref.tableEl)
```

## `devtools` {#root-devtools}

> Exported directly from `./vanilla`, see [devtools](/reference/vanilla-api#devtools) in vanilla exports for more.

```tsx
const store = create({ username: '', password: '' })

devtools(store, { name: 'LoginStore', enable: true })
```
