# Enhancer {#enhancer}

## What Is an Enhancer? {#what-is-enhancer}

An enhancer is a function that takes an object as an argument and returns a new object, which is an enhanced version of the original object.

Enhancers can be used to modify the properties of an object, add new properties, remove properties, or do other things. They offer a flexible way for users to extend functionalities without changing the existing code.

A simple example of an enhancer:

```tsx
function enhancer(store) {
  // Perform some enhancement

  // Return the enhanced object
  return {
    ...store,
    awesomeFeature() {
      console.log('awesomeFeature');
    }
  };
}

export const enhancedStore = enhancer(create({ count: 1 }));
```

## Why Use Enhancers? {#why-enhancer}

Reactive is designed to be framework-agnostic, and to adapt to a variety of functional scenarios, Reactive introduces the concept of enhancers. The internal differences in functionality between Vanilla and React are actually implemented by applying different enhancers.

For convenience and alignment with the original API, Reactive has built-in some enhancers and also provides some enhancer APIs, allowing users to enhance the functionality of stores. If needed, users can also write their own enhancers to expand the functionality of their stores.

## The Initial VanillaStore {#vanilla-store}

VanillaStore is the initial form of the store returned by Reactive. It is a simple object containing `mutate` and `restore` methods, which include only the most basic functionalities and no enhancers.

```tsx
export type VanillaStore<State extends object> = {
  /**
   * The mutable state object, whose changes will trigger subscribers.
   */
  mutate: State
  /**
   * Restore to initial state.
   */
  restore: () => void
}
```

## Built-in Enhancers {#built-in-enhancers}

### create {#create}

The `create` method is suitable for React and includes some built-in enhancers, such as:

- [withSubscribe](/guide/enhancers/with-subscribe): Contributes the `subscribe` method
- [withUseSubscribe](/guide/enhancers/with-use-subscribe): Contributes the `useSubscribe` Hook
- [withSnapshot](/guide/enhancers/with-snapshot): Contributes the `snapshot` method
- [withUseSnapshot](/guide/enhancers/with-use-snapshot): Contributes the `useSnapshot` Hook

```tsx
import { create } from '@shined/reactive';

const store = create({ count: 1 });

// Vanilla Store common properties
store.mutate
store.restore

// Properties contributed by enhancers
store.subscribe
store.useSubscribe
store.snapshot
store.useSnapshot
```

### createVanilla {#create-vanilla}

The `createVanilla` method is suitable for Vanilla JavaScript and includes some built-in enhancers, such as:

- [withSubscribe](/guide/enhancers/with-subscribe): Contributes the `subscribe` method
- [withSnapshot](/guide/enhancers/with-snapshot): Contributes the `snapshot` method

In Vanilla scenarios, if you need to use internal enhancers, you should import them from `/vanilla`.

```tsx
import { createVanilla } from '@shined/reactive/vanilla';

const store = createVanilla({ count: 1 });

// Vanilla Store common properties
store.mutate
store.restore

// Properties contributed by enhancers
store.subscribe
store.snapshot
```
