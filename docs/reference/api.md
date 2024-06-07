---
outline: deep
---

# Reactive API

## Root Exports (`./`) {#root}

```tsx
import { create, ref, devtools } from '@shined/reactive'
```

### `create` {#root-create}

An alias of `createWithHooks`. It returns a store with extra React Hook `useSnapshot`. See [create](#vanilla-create) in vanilla exports for other properties of store, 

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

### `ref` {#root-ref}

> Exported directly from `./vanilla`, see [ref](#vanilla-ref) in vanilla exports for more.

```tsx
const store = create({ 
  count: 1,
  ref: ref({ tableEl: null as null | HTMLTableElement })
})

store.mutate.ref.tableEl = document.getElementById("#table")

// in React component
const tableEl = store.useSnapshot(s => s.ref.tableEl)
```

### `devtools` {#root-devtools}

> Exported directly from `./vanilla`, see [devtools](#vanilla-devtools) in vanilla exports for more.

```tsx
const store = create({ username: '', password: '' })

devtools(store, { name: 'LoginStore', enable: true })
```

## Vanilla Exports (`./vanilla`) {#vanilla}

```tsx
import {
  create,
  subscribe,
  getSnapshot,
  ref,
  devtools,
  produce,
  proxy,
} from '@shined/reactive/vanilla'
```

### `create` {#vanilla-create}

```tsx
import { create } from '@shined/reactive'

const store = create(initialState, options)

// const countStore = create({ count: 1 })
```

#### InitialState {#vanilla-create-initial-state}

An object that represents the initial state of the store.

::: details It can be any pure object, or **non-serializable state** wrapped in [ref](#vanilla-ref) function.

```tsx
const store = create({
  name: 'Bob',
  refObj: ref({ form: new FormData() }),
})
```

:::

#### Options (optional) {#vanilla-create-options}

It's has no options currently, but it may be added in the future.

#### Returns {#vanilla-create-returns}

Returns a object with the following properties (usually called `store`)

```tsx
const { mutate, restore, subscribe } = store;
```

##### `store.mutate`

A mutable [State Proxy](#vanilla-proxy), same type with initial state, whose changes will trigger subscribers.

##### `store.subscribe(listener, options?, selector?)`

A method to subscribe to state changes.

```tsx
store.subscribe((changes, _version) => {
  console.log('changes', changes)
})
```

::: details Type Definitions

```tsx
export type StoreSubscriber<State extends object> = (
  /**
   * Callback to be called when state changes.
   */
  listener: SubscribeCallback<State>,
  /**
   * Whether to sync the listener with the current state.
   */
  sync?: boolean,
  /**
   * Selector to select a slice of the state.
   */
  selector?: ObjSelector<State>
) => () => void

export type SubscribeCallback<State> = (changes: ChangeItem<State>, version?: number) => void

export type ChangeItem<State> = {
  props: PropertyKey[]
  propsPath: string
  previous: unknown
  current: unknown
  snapshot: State
}

export type ObjSelector<State> =
  | ((state: State) => State)
  | (<StoreSlice extends object>(state: State) => StoreSlice)
```

:::

##### `store.restore()`

A method to restore the store to the initial state.

```tsx
store.restore()
```

### `subscribe` {#vanilla-subscribe}

A method to subscribe to state changes, the first param should be a [State Proxy](#vanilla-proxy).

```tsx
subscribe(store.mutate, (changes, version) => {})
subscribe(store.mutate.user.name, (changes, version) => {})
```

::: details Type Definitions

```tsx
export type ChangeItem<State> = {
  props: PropertyKey[]
  propsPath: string
  previous: unknown
  current: unknown
  snapshot: State
}

export type SubscribeCallback<State> = (changes: ChangeItem<State>, version?: number) => void

export function subscribe<State extends object>(
  proxyState: State,
  callback: SubscribeCallback<State>,
  notifyInSync?: boolean
): () => void
```

:::

### `getSnapshot` {#vanilla-getSnapshot}

A method to get a snapshot of the current state to consume. Param should be a [State Proxy](#vanilla-proxy) (created by `proxy`).

```tsx
const state = getSnapshot(store.mutate)
const hobbiesState = getSnapshot(store.mutate.hobbies)
```

::: details Type Definitions

```tsx
export function getSnapshot<State extends object>(proxyState: State): State
```

:::

### `ref` {#vanilla-ref}

A function to allow non-serializable state in initial state.

```tsx {3}
const store = create({
  name: 'Bob',
  tableRef: ref({ table: null }),
})
```

::: warning
You should change the ref object property, **NOT** the ref object itself.
:::

```tsx {3,6}
const changeTableRef = () => {
  // ❌ It's not correct to modify the ref object itself
  // store.mutate.tableRef = { table: document.querySelector('#table') }

  // ✅ It's correct to modify the ref object property
  store.mutate.tableRef.table = document.querySelector('#table')
}
```

### `devtools` {#vanilla-devtools}

A function to integrate with Redux DevTools. Just wrapper store in it, `enable` is `true` by default.

```tsx {3}
const store = create({ count: 1 })

devtools(store, { name: 'CountStore', enable: true })
```

::: details Type Definitions

```tsx
/** redux devtool options, if set, will enable redux devtool */
export type DevtoolsOptions = DeepExpandType<
  {
    /* name of the store, will be displayed as title in devtool switch panel */
    name: string
    /** @default true */
    enable?: boolean
  } & ExtConfig
>
```

:::

### `produce` {#vanilla-produce}

An alternative to [immer's `produce`](https://immerjs.github.io/immer/produce), but it require **pure object** as initial state, **NOT** support circular reference.

```tsx
const nextState = produce(store.mutate, (draft) => {
  draft.count += 1
  draft.user.name = 'Alice'
})
```

::: details Type Definitions

```tsx
export function produce<State extends object>(
  obj: State,
  draftHandler: (draft: State) => void
): State
```

:::

### `proxy` {#vanilla-proxy}

An **internal** function to create a **State Proxy** (like `store.mutate`) recursively, itself and its properties are all **Proxied State**.

::: warning
It's **internal** and **NOT** recommended to use directly, use `create` instead.
:::

```tsx
const proxyState = proxy({ count: 1, user: { name: 'Bob' } })
proxyState.count += 1
proxyState.user.name = 'Alice'
```

::: details Type Definitions

```tsx
export function proxy<State extends object>(
  initState: State,
  parentProps: PropertyKey[] = []
): State
```

:::
