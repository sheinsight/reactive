# FAQ

## ❓ How to Store Unproxied State in Reactive Store {#store-unproxied-state}

You can use [ref](/reference/advanced/ref) to achieve this. This is very useful when you want to embed an object that is not wrapped by internal proxies within a proxy (such as storing DOM elements, File objects, and other unstructured data), but note that its changes will **not** be tracked. For more details and considerations, please refer to [ref](/reference/advanced/ref).

## ❓ Input Process May Be Interrupted When State Values Are Passed to `<input />` Elements {#input-chinese}

By default, Reactive internally notifies changes asynchronously when state changes occur, to achieve batched updates for rendering optimization. If you want to disable this (for example, when used with `<input />` elements, it may conflict with input method [Composition events](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent)), you can set the `sync` option to `true` when using `store.useSnapshot` to notify changes synchronously and avoid this issue.

```tsx
const store = create({ inputValue: '' })

const updateInputValue = (value: string) => {
  store.mutate.inputValue = value
}

function App() {
  // Note that sync: true is used here to notify changes synchronously, avoiding input method composition interruption
  const inputValue = store.useSnapshot((s) => s.inputValue, { sync: true })

  return (
    <input
      value={inputValue}
      onChange={(e) => {
        updateInputValue(e.target.value)
      }}
    />
  )
}
```

This issue is difficult to avoid. The pseudo-code for Reactive's internal asynchronous notification is as follows, which allows you to intuitively experience this input method composition interruption phenomenon:

```tsx
import { useState } from 'react'

export default function App() {
  const [state, setState] = useState('')

  return (
    <input
      value={state}
      onChange={(e) => {
        const value = e.target.value
        Promise.resolve().then(() => setState(value))
      }}
    />
  )
}
```

Additionally, if you are using React 18 or above, you can consider using the [setGlobalNotifyInSync](/reference/advanced/set-global-notify-in-sync) method introduced in version `0.3.0` to globally set the `sync` option to `true` to solve this issue. For more information, please refer to the [setGlobalNotifyInSync](/reference/advanced/set-global-notify-in-sync) documentation.

```tsx
// If you are using React 18 or above, you can globally set sync to true in the entry file
import { setGlobalNotifyInSync } from '@shined/reactive'
setGlobalNotifyInSync(true);
```

## ❓ Noticeable Lag When Operating on Large Datasets (Usually Tens of Millions of Reads or More) {#large-data}

In almost all use cases, you may not encounter performance bottlenecks. However, when dealing with extremely large datasets (tens of millions of read operations or more), performance issues may become a challenge. This is mainly because when using `Proxy`, each data access triggers the proxy's `Getter` method, resulting in significant performance overhead during large-scale read operations. To avoid performance issues with large datasets, consider the following strategies:

- **Use useState:** Use hooks like `useState` to separately manage large datasets that don't require reactive features.
- **Use ref wrapping:** Use [ref](/reference/advanced/ref) to wrap large datasets to avoid being proxied by `Proxy`.

You can intuitively experience this performance difference through the following code in the console:

```tsx
const obj = { name: 'Reactive' };
const proxiedObj = new Proxy(obj, {});

console.time('Normal Object Get');
for(let i = 0; i < 100_000_000; i++) obj.name;
console.timeEnd('Normal Object Get'); // ~50ms, Chrome 131, MacBook Pro (M1 Pro + 16G)

console.time('Proxied Object Get');
for(let i = 0; i < 100_000_000; i++) proxiedObj.name;
console.timeEnd('Proxied Object Get'); // ~1000ms, Chrome 131, MacBook Pro (M1 Pro + 16G)
```
