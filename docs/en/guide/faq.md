# Frequently Asked Questions

## ❓ How to Store Unproxied State in Reactive Store {#store-unproxied-state}

You can use [ref](/reference/advanced/ref) to achieve this. This is very useful when you want to nest an object that is not wrapped by the internal proxy within the proxy (such as storing DOM elements, File objects, and other unstructured data), but please note that its changes will **not** be tracked. For more details and considerations, please refer to [ref](/reference/advanced/ref).

## ❓ Input Process May Be Interrupted When State Values Are Passed to `<input />` Elements {#input-chinese}

By default, when state changes occur, Reactive internally notifies changes asynchronously to achieve batching updates for rendering optimization. If you want to disable this (for example, when used with `<input />` elements, which may conflict with the input method's [Composition events](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent)), you can set the `sync` option to `true` when using `store.useSnapshot` to notify changes synchronously and avoid this issue.

Additionally, if you are using React 18 or above, you can consider using the [setGlobalNotifyInSync](/reference/advanced/set-global-notify-in-sync) method to globally set the `sync` option to `true` to resolve this issue.

```tsx {8}
const store = create({ inputValue: '' })

const updateInputValue = (value: string) => {
  store.mutate.inputValue = value
}

function App() {
  // Note: using sync: true here to notify changes synchronously, avoiding input method interruption
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

// If you are using React 18 or above, you can globally set sync to true in the entry file
import { setGlobalNotifyInSync } from '@shined/reactive'
setGlobalNotifyInSync(true);
```

## ❓ Noticeable Lag When Operating on Large Data Sets (Usually Over Ten Million Read Operations) {#large-data}

In almost all use cases, you may not encounter performance bottlenecks. However, when dealing with extremely large data sets (tens of millions of read operations and above), performance issues may become a challenge. This is mainly because when using `Proxy`, each data access triggers the proxy's `Getter` method, resulting in significant performance overhead during large-scale read operations. To avoid performance issues with large data sets, consider the following strategies:

- **Use useState:** Use hooks like `useState` to separately manage large data sets that don't require reactive features.
- **Use ref wrapping:** Use [ref](/reference/advanced/ref) to wrap large data sets to avoid being proxied by `Proxy`.

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
