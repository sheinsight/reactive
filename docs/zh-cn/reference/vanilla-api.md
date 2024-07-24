# Vanilla API （从 `./vanilla` 导出） {#vanilla-api}

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

## `create` 创建 {#create}

```tsx
import { create } from '@shined/reactive'

const store = create(initialState, options)

// const countStore = create({ count: 1 })
```

### InitialState 初始状态 {#create-initial-state}

一个表示存储初始状态的对象。

::: details 它可以是任何纯对象，或 **非序列化状态** 用 [ref](#ref) 函数包裹。

```tsx
const store = create({
  name: 'Bob',
  refObj: ref({ form: new FormData() }),
})
```

:::

### Options 选项（可选） {#create-options}

当前没有选项，但将来可能会添加。

### 返回值 {#create-returns}

返回一个具有以下属性的对象（通常称为 `store`）

```tsx
const { mutate, restore, subscribe } = store;
```

#### `store.mutate` {#create-returns-mutate}

一个可变的[状态代理](#proxy)，与初始状态同类型，其改变将触发订阅者。

#### `store.subscribe(listener, options?, selector?)` 订阅 {#create-returns-subscribe}

一个订阅状态变化的方法。

```tsx
store.subscribe((changes, _version) => {
  console.log('changes', changes)
})
```

::: details 类型定义

```tsx
export type StoreSubscriber<State extends object> = (
  /**
   * 当状态变化时要调用的回调函数。
   */
  listener: SubscribeCallback<State>,
  /**
   * 是否将监听器与当前状态同步。
   */
  sync?: boolean,
  /**
   * 选择器，用于选择状态的一部分。
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
  | (<StateSlice extends object>(state: State) => StateSlice)
```

:::

#### `store.restore()` 恢复 {#create-returns-restore}

一个方法，将存储恢复到初始状态。

```tsx
store.restore()
```

## `subscribe` 订阅 {#subscribe}

一个订阅状态变化的方法，第一个参数应该是一个[状态代理](#proxy)。

```tsx
subscribe(store.mutate, (changes, version) => {})
subscribe(store.mutate.user.name, (changes, version) => {})
```

::: details 类型定义

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

## `getSnapshot` 获取快照 {#get-snapshot}

一个获取当前状态快照以供使用的方法。参数应该是一个由 `proxy` 创建的[状态代理](#vanilla-proxy)。

```tsx
const state = getSnapshot(store.mutate)
const hobbiesState = getSnapshot(store.mutate.hobbies)
```

::: details 类型定义

```tsx
export function getSnapshot<State extends object>(proxyState: State): State
```

:::

## `ref` 引用 {#ref}

一个允许在初始状态中使用非序列化状态的函数。

```tsx {3}
const store = create({
  name: 'Bob',
  tableRef: ref({ table: null }),
})
```

::: warning 警告
你应该更改 ref 对象属性，**不要** 更改 ref 对象本身。
:::

```tsx {3,6}
const changeTableRef = () => {
  // ❌ 直接修改 ref 对象本身是不正确的
  // store.mutate.tableRef = { table: document.querySelector('#table') }

  // ✅ 修改 ref 对象属性是正确的
  store.mutate.tableRef.table = document.querySelector('#table')
}
```

## `devtools` 开发者工具 {#devtools}

一个集成 Redux DevTools 的函数。只需将存储包裹在其中，默认 `enable` 为 `true`。

```tsx {3}
const store = create({ count: 1 })

devtools(store, { name: 'CountStore', enable: true })
```

::: details 类型定义

```tsx
/** redux devtool 选项，如果设置，将启用 redux devtool */
export type DevtoolsOptions = DeepExpandType<
  {
    /* 存储的名称，将作为标题显示在 devtool 切换面板中 */
    name: string
    /** @default true */
    enable?: boolean
  } & ExtConfig
>
```

:::

## `produce` 生成 {#produce}

[immer 的 `produce`](https://immerjs.github.io/immer/produce) 的替代品，但它要求 **纯对象** 作为初始状态，**不支持** 循环引用。

```tsx
const nextState = produce(store.mutate, (draft) => {
  draft.count += 1
  draft.user.name = 'Alice'
})
```

::: details 类型定义

```tsx
export function produce<State extends object>(
  obj: State,
  draftHandler: (draft: State) => void
): State
```

:::

## `proxy` 代理 {#proxy}

一个**内部**函数，递归地创建**状态代理**（如 `store.mutate`），它本身及其属性都是**代理状态**。

::: warning 警告
它是**内部的**并且**不建议**直接使用，请使用 `create` 代替。
:::

```tsx
const proxyState = proxy({ count: 1, user: { name: 'Bob' } })
proxyState.count += 1
proxyState.user.name = 'Alice'
```

::: details 类型定义

```tsx
export function proxy<State extends object>(
  initState: State,
  parentProps: PropertyKey[] = []
): State
```

:::
