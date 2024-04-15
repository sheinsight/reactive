---
outline: deep
---

# Reactive API

## Exports from `./` {#root}

```tsx
import { create, ref, devtools } from '@shined/reactive'
```

### `create` {#root-create}

An alias of `createWithHooks`. It extends the `create` function from Vanilla and return a store object with extra React Hooks `useSnapshot`, which has many overloads as below.

For other existed properties, see [create](#vanilla-exports-create) in Vanilla Exports.

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

Exported directly from `./vanilla`, see [ref](#vanilla-exports-ref) in Vanilla Exports.

### `devtools` {#root-devtools}

Exported directly from `./vanilla`, see [devtools](#vanilla-exports-devtools) in Vanilla Exports.

## Exports from `./vanilla` {#vanilla}

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
```

#### InitialState {#vanilla-create-initial-state}

An object that represents the initial state of the store.

::: details It can be any pure object, or **non-serializable state** via [ref](#ref-vanilla-ref) function. Click to view the code.

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

##### `store.mutate`

A [State Proxy](/reference/api#proxy), also a mutable state object, same with initial state in type, whose changes will trigger subscribers.

##### `store.subscribe(listener, options?, selector?)`

Method to subscribe to state changes.

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

##### `store.reset()`

A method to reset the store to the initial state.

### `subscribe` {#vanilla-subscribe}

A method to subscribe to state changes. First param should be a [State Proxy](/reference/api#proxy).

```tsx
subscribe(store.mutate, (changes, version) => {})
subscribe(store.mutate.name, (changes, version) => {})
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

A method to get a snapshot of the current state to consume. Param should be a [State Proxy](/reference/api#proxy) (created by `proxy`).

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

devtools(store, { name: 'MyStore', enable: true })
```

::: details Options Type Definitions

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

::: details Type Definitions

```tsx
export function produce<State extends object>(
  obj: State,
  draftHandler: (draft: State) => void
): State
```

:::

### `proxy` {#vanilla-proxy}

An internal function to create a **State Proxy** (like `store.mutate`) recursively, itself and its properties are all **Proxied State**.

::: details Type Definitions

```tsx
export function proxy<State extends object>(
  initState: State,
  parentProps: PropertyKey[] = []
): State
```

:::
