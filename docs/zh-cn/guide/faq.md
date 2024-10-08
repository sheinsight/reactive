# 常见问题

## ❓ 如何在 Reactive 中存储未代理状态，以保持使用体验一致性 {#store-unproxied-state}

您可以使用 [ref](/reference/advanced/ref) 来实现这一点。当您希望在代理中嵌套一个不被内部代理包裹的对象时（比如存储 DOM 元素、File 对象等非结构化数据），这非常有用，但请注意，它的变化**不会**被追踪。更多详情和注意事项请参阅 [ref](/reference/advanced/ref)。

## ❓ 当状态值传递给 `<input />` 元素时，输入过程可能会被打断 {#input-chinese}

默认情况下，状态变更时，会异步地通知变更，来实现合并更新（即批处理）的效果，以优化渲染。

如果您想禁用它（例如被 `<input />` 元素使用时，可能与输入法的 [Composition 事件](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent) 冲突），您可以在使用 `store.useSnapshot` 时设置 `sync` 选项为 `true` 来同步地通知变更，以避免这个问题。

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
