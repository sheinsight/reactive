# createVanilla

::: tip Tip
In Vanilla scenarios, please import all APIs from `/vanilla` to avoid errors due to dependencies on React without it being installed.
:::

Create a Store without Hooks properties, suitable for Vanilla JS applications. It includes built-in enhancers `withSubscribe` and `withSnapshot`.

::: tip Tip
Before version `v0.2.0`, the Vanilla part of `createVanilla` was known as `create`. To avoid confusion with the React part's `create`, it was renamed to `createVanilla` starting from version `v0.2.0`.
:::

```tsx
import { createVanilla } from '@shined/reactive';

const vanillaStore = createVanilla({ count: 0});

// vanillaStore.mutate
// vanillaStore.restore()

// vanillaStore.snapshot()
// vanillaStore.subscribe()
```

## Store Mutate \{#store-mutate}

Identical to [store.mutate](/reference/basic/create#create) in [create](/reference/basic/create#create).

## Store Snapshot \{#store-snapshot}

Identical to [store.snapshot](/reference/basic/create#create) in [create](/reference/basic/create#create), supported by [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## Store Subscribe \{#store-subscribe}

Identical to [store.subscribe](/reference/basic/create#create) in [create](/reference/basic/create#create), supported by [withSubscribe](/guide/enhancers/builtins/with-subscribe).

## Store Restore \{#store-restore}

Identical to [store.restore](/reference/basic/create#create) in [create](/reference/basic/create#create).
