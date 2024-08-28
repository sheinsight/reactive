# 增强器 （Enhancer） {#enhancer}

## 什么是增强器？ {#what-is-enhancer}

增强器是一个函数，它接受一个对象作为参数并返回一个新的对象，这个新对象是原始对象的增强版本。

增强器可以用来修改对象的属性、添加新属性、删除属性，或者做一些其他的事情，是一种非常灵活的方式，可以让用户在不改变原有代码的情况下，对功能进行扩充。

一个简单的增强器示例：

```tsx
function enhancer(store) {
  // 做一些增强操作

  // 返回增强后的对象
  return {
    ...store,
    awesomeFeature() {
      console.log('awesomeFeature');
    }
  };
}

export const enhancedStore = enhancer(create({ count: 1 }));
```

## 为什么要使用增强器？ {#why-enhancer}

Reactive 被设计为框架无关的，为了适应多样功能场景，Reactive 引入了增强器的概念，内部 Vanilla 和 React 的功能特性区别，其实就是通过应用不同的增强器来实现的。

为了方便使用以及与原有 API 对齐，Reactive 内置了一部分增强器，同时也提供了一些增强器的 API，让用户可以增强 store 的功能特性。如果需要，用户也可以自行编写增强器以扩充 store 的功能。

## 最初的 VanillaStore {#vanilla-store}

VanillaStore 是 Reactive 返回的 store 的最初形态，它是一个包含 `mutate` 和 `restore` 方法的普通的对象，只包含了最基本的功能，不包含任何增强器。

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

## 内置增强器 {#built-in-enhancers}

### create {#create}

`create` 方法适用于 React，内置了一些增强器，包括：

- [withSubscribe](/guide/enhancers/with-subscribe)：贡献了 `subscribe` 方法
- [withUseSubscribe](/guide/enhancers/with-use-subscribe)：贡献了 `useSubscribe` Hook
- [withSnapshot](/guide/enhancers/with-snapshot)：贡献了 `snapshot` 方法
- [withUseSnapshot](/guide/enhancers/with-use-snapshot)：贡献了 `useSnapshot` Hook

```tsx
import { create } from '@shined/reactive';

const store = create({ count: 1 });

// Vanilla Store 通用属性
store.mutate
store.restore

// 通过增强器贡献的属性
store.subscribe
store.useSubscribe
store.snapshot
store.useSnapshot
```

### createVanilla {#create-vanilla}

`createVanilla` 方法适用于 Vanilla JavaScript，内置了一些增强器，包括：

- [withSubscribe](/guide/enhancers/with-subscribe)：贡献了 `subscribe` 方法
- [withSnapshot](/guide/enhancers/with-snapshot)：贡献了 `snapshot` 方法

Vanilla 场景下，如果需要引用内部的增强器，需要从 `/vanilla` 导入。

```tsx
import { createVanilla } from '@shined/reactive/vanilla';

const store = createVanilla({ count: 1 });

// Vanilla Store 通用属性
store.mutate
store.restore

// 通过增强器贡献的属性
store.subscribe
store.snapshot
```
