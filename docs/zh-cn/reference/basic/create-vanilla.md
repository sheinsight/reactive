# createVanilla {#create-vanilla}

创建一个 Store，不包含 Hooks 属性，适用于 Vanilla JS 应用，内置了 [withSubscribe](#) 和 [withSnapshot](#) 增强器。

::: tip 提示
在 `v0.1.5` 版本之前，Vanilla 部分的 `createVanilla` 被称为 `create`，为了防止与 React 部分的 `create` 混淆，从 `v0.1.5` 起其改名为 `createVanilla`。
:::

```tsx
import { createVanilla } from '@shined/reactive';

const vanillaStore = createVanilla({ count: 0});

// vanillaStore.mutate
// vanillaStore.restore()

// vanillaStore.snapshot()
// vanillaStore.subscribe()
```

## store.mutate {#store-mutate}

与 [create](/reference/basic/create#create) 中的 [store.mutate](/reference/basic/create#store-mutate) 相同。

## store.snapshot {#store-snapshot}

与 [create](/reference/basic/create#create) 中的 [store.snapshot](/reference/basic/create#store-snapshot) 相同，由 [withSnapshot](#) 提供支持。

## store.subscribe {#store-subscribe}

与 [create](/reference/basic/create#create) 中的 [store.subscribe](/reference/basic/create#store-subscribe) 相同，由 [withSubscribe](#) 提供支持。

## store.restore {#store-restore}

与 [create](/reference/basic/create#create) 中的 [store.restore](/reference/basic/create#store-restore) 相同。
