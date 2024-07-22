# FAQ

## ❓ How to store unproxied state in reactive {#store-unproxied-state}

You can use [ref](/reference/root-api#ref) to do that. It is useful in the case that you want to nest an object in a proxy that is not wrapped in an inner proxy, but mind yourself, its changes is will **NOT** be tracked.

Head to [ref](/reference/root-api#ref) for more details.

## ❓ When passing state to `input` element, an exception occurred while typing Chinese {#input-chinese}

State mutations are batched synchronously by default before triggering re-render to optimize rendering. If you want to disable it (such as consumed by `<input />` element), you can set `sync` option to `true` when creating snapshot to avoid this issue.

```tsx {4}
const store = create({ inputValue: '' })

function App() {
  const inputValue = store.useSnapshot((s) => s.inputValue, { sync: true })

  return (
    <input
      value={inputValue}
      onChange={(e) => {
        store.mutate.inputValue = e.target.value
      }}
    />
  )
}
```
