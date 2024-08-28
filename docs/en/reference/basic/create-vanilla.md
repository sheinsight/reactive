# createVanilla

Create a Store without Hooks properties, suitable for Vanilla JS applications. It includes built-in enhancers `withSubscribe` and `withSnapshot`.

::: tip Tip
Before version `v0.1.5`, the Vanilla part of `createVanilla` was known as `create`. To avoid confusion with the React part's `create`, it was renamed to `createVanilla` starting from version `v0.1.5`.
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

Identical to [store.snapshot](/reference/basic/create#create) in [create](/reference/basic/create#create), supported by [withSnapshot](#).

## Store Subscribe \{#store-subscribe}

Identical to [store.subscribe](/reference/basic/create#create) in [create](/reference/basic/create#create), supported by [withSubscribe](#).

## Store Restore \{#store-restore}

Identical to [store.restore](/reference/basic/create#create) in [create](/reference/basic/create#create).
