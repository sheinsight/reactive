# Frequently Asked Questions (FAQ) {#faq}

## ❓ How to Store Unproxied State in Reactive Proxied Store \{#store-unproxied-state}

You can achieve this by using [ref](/reference/advanced/ref). This is particularly useful when you want to nest an object within the proxy that is not wrapped by the internal proxy (such as storing DOM elements, File objects, and other unstructured data). However, please note that its changes will **not** be tracked. For more details and considerations, please refer to [ref](/reference/advanced/ref).

## ❓ When State is Passed to `<input />`, Input May Be Interrupted \{#work-with-input-composition-events}

By default, when the state changes, changes are notified asynchronously to achieve a merged update (i.e., batching) effect, optimizing rendering.

If you want to disable it (for example, when used by an `<input />` element, it may conflict with the input method's [Composition events](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent)), you can set the `sync` option to `true` when using `store.useSnapshot` to notify changes synchronously, avoiding this problem.

```tsx {8}
const store = create({ inputValue: '' })

const updateInputValue = (value: string) => {
  store.mutate.inputValue = value
}

function App() {
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

## ❓ When Handling Extremely Large Datasets (Typically Tens of Millions of Reads or More), Noticeable Lags Occur

In the vast majority of use cases, you are unlikely to encounter performance bottlenecks. However, when dealing with extremely large datasets (with tens of millions of read operations or more), performance issues may become a problem. This is mainly because, when using `Proxy`, every data access triggers the proxy's `Getter` method, thereby causing a significant performance overhead during a large number of read operations. To avoid performance issues with extremely large datasets, consider the following solutions:

- **Use useState:** Manage large datasets that don't require reactive features separately using hooks like `useState`.
- **Use ref to wrap:** Wrap large datasets with [ref](/reference/advanced/ref) to prevent them from being proxied by `Proxy`.

You can feel this performance difference intuitively by running the following code in the console:

```tsx
const obj = { name: 'Reactive' };
const proxiedObj = new Proxy(obj, {});

console.time('Normal Object Get');
for(let i = 0; i < 100_000_000; i++) obj.name;
console.timeEnd('Normal Object Get'); // ~50ms, Chrome 131, MacBook Pro (M1 Pro + 16G)

console.time('Proxied Object Get');
for(let i = 0; i = 100_000_000; i++) proxiedObj.name;
console.timeEnd('Proxied Object Get'); // ~1000ms, Chrome 131, MacBook Pro (M1 Pro + 16G)
```
