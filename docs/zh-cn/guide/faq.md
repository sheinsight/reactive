# FAQ（常见问题解答）

## ❓ 如何在 Reactive 中存储未代理的状态 {#store-unproxied-state}

您可以使用 [ref](/reference/root#ref) 来实现这一点。当您希望在代理中嵌套一个不被内部代理包裹的对象时，这非常有用，但请注意，它的变化**不会**被追踪。

更多详情请参阅 [ref](/reference/root#ref)。

## ❓ 当状态传递给 `input` 元素时，输入中文过程中出现异常 {#input-chinese}

默认情况下，状态变更会在触发重新渲染之前同步批处理，以优化渲染效果。如果您想禁用它（例如被 `<input />` 元素使用时），您可以在创建快照时设置 `sync` 选项为 `true`，以避免这个问题。

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
