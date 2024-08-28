# Frequently Asked Questions (FAQ) {#faq}

## How to Store Unproxied State in Reactive to Maintain Consistency of Usage Experience \{#store-unproxied-state}

You can achieve this by using [ref](/reference/root#ref). This is particularly useful when you want to nest an object within the proxy that is not wrapped by the internal proxy (such as storing DOM elements, File objects, and other unstructured data). However, please note that its changes will **not** be tracked. For more details and considerations, please refer to [ref](/reference/root#ref).

## When State Value is Passed to an `<input />` Element, The Input Process May Be Interrupted \{#work-with-input-composition-events}

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
