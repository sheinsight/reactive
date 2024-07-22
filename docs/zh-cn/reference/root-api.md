# 根 API（从 `./` 导出） {#root-api}

```tsx
import { create, ref, devtools } from '@shined/reactive'
```

## `create` 方法 {#create}

针对 React 的一个方法，用于创建带有额外 React Hook `useSnapshot` 的 [原生 store](/zh-cn/reference/vanilla-api#create)。关于其它属性，请参见 vanilla 导出中的 [create#returns](/zh-cn/reference/vanilla-api#create-returns)。

```tsx
const store = create({ count: 1 })

// 在 React 组件中
const count = store.useSnapshot(s => s.count)
const count = store.useSnapshot(s => s.count, { sync:true })
const { count } = store.useSnapshot()
const { count } = store.useSnapshot({ sync:true })
```

::: details 类型定义

```tsx
/**
 * `store.useSnapshot()` 的示例状态
 * {
 *   name: 'Bob',
 *   age: 20,
 *   hobbies: ['编程', '骑行'],
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

## `ref` 方法 {#ref}

> 直接从 `./vanilla` 导出，更多信息请参见 vanilla 导出的 [ref](/zh-cn/reference/vanilla-api#ref)。

```tsx
const store = create({ 
  count: 1,
  ref: ref({ tableEl: null as null | HTMLTableElement })
})

store.mutate.ref.tableEl = document.getElementById("#table")

// 在 React 组件中
const tableEl = store.useSnapshot(s => s.ref.tableEl)
```

## `devtools` 方法 {#devtools}

> 直接从 `./vanilla` 导出，更多信息请参见 vanilla 导出的 [devtools](/zh-cn/reference/vanilla-api#devtools)。

```tsx
const store = create({ username: '', password: '' })

devtools(store, { name: 'LoginStore', enable: true })
```
