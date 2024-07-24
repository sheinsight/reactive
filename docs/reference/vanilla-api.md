# Vanilla API (exported from `./vanilla`) {#vanilla-api}

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

## `create` {#create}

```tsx
import { create } from '@shined/reactive'

const store = create(initialState, options)

// const countStore = create({ count: 1 })
```

### InitialState {#create-initial-state}

An object that represents the initial state of the store.

::: details It can be any pure object, or **non-serializable state** wrapped in [ref](#ref) function.

```tsx
const store = create({
  name: 'Bob',
  refObj: ref({ form: new FormData() }),
})
```

:::

### Options (optional) {#create-options}

It's has no options currently, but it may be added in the future.

### Returns {#create-returns}

Returns a object with the following properties (usually called `store`)

```tsx
const { mutate, restore, subscribe } = store;
```

#### `store.mutate` {#create-returns-mutate}

A mutable [State Proxy](#proxy), same type with initial state, whose changes will trigger subscribers.

#### `store.subscribe(listener, options?, selector?)` {#create-returns-subscribe}

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
   * @deprecated It is confusing, and makes TS type wrong in callback's `changes` argument. It will be removed in the next major version.
   */
  selector?: (state: State) => object
) => () => void

export type SubscribeCallback<State> = (changes: ChangeItem<State>, version?: number) => void

export type ChangeItem<State> = {
  props: PropertyKey[]
  propsPath: string
  previous: unknown
  current: unknown
  snapshot: State
}
```

:::

#### `store.restore()` {#create-returns-restore}

A method to restore the store to the initial state.

```tsx
store.restore()
```

## `subscribe` {#subscribe}

A method to subscribe to state changes, the first param should be a [State Proxy](#proxy).

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

## `getSnapshot` {#get-snapshot}

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

## `ref` {#ref}

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

## `devtools` {#devtools}

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

## `produce` {#produce}

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

## `proxy` {#proxy}

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
