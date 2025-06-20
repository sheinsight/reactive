# 常见问题

## ❓ 如何在 Reactive 中存储未代理状态，以保持使用体验一致性 {#store-unproxied-state}

你可以使用 [ref](/reference/advanced/ref) 来实现这一点。当你希望在代理中嵌套一个不被内部代理包裹的对象时（比如存储 DOM 元素、File 对象等非结构化数据），这非常有用，但请注意，它的变化**不会**被追踪。更多详情和注意事项请参阅 [ref](/reference/advanced/ref)。

## ❓ 当状态值传递给 `<input />` 元素时，输入过程可能会被打断 {#input-chinese}

默认情况下，当状态变更时 Reactive 内部会异步地通知变更，来实现合并更新（即批处理）的效果，以优化渲染。如果你想禁用它（例如被 `<input />` 等元素使用时，可能与输入法的 [Composition 事件](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent) 冲突），你可以在使用 `store.useSnapshot` 时设置 `sync` 选项为 `true` 来同步地通知变更，以避免这个问题。

此外，如果你使用 React 18 及以上版本，可以考虑使用 [setGlobalNotifyInSync](/reference/advanced/set-global-notify-in-sync) 方法来全局设置 `sync` 选项为 `true` 以解决此问题。

```tsx {8}
const store = create({ inputValue: '' })

const updateInputValue = (value: string) => {
  store.mutate.inputValue = value
}

function App() {
  // 注意这里使用了 sync: true 来同步地通知变更，避免输入法组词中断
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

// 如果你使用 React 18 及以上版本，可以在入口文件中全局设置 sync 为 true
import { setGlobalNotifyInSync } from '@shined/reactive'
setGlobalNotifyInSync(true);
```

## ❓ 当操作超大数据集（通常读千万次以上）时，有较为明显的卡顿 {#large-data}

在几乎绝大多数使用场景中，你可能不会遇到性能瓶颈。然而，当在处理超大数据集（千万级别以上读操作次数）时，性能问题可能会成为一个难题。这主要是由于使用 `Proxy` 时，每次数据访问都会触发代理的 `Getter` 方法，从而在进行大量的读操作时产生显著的性能开销，为避免超大数据集下的性能问题，可以考虑以下解决策略：

- **使用 useState：** 使用 `useState` 等钩子单独管理不需要响应式特性的大数据集。
- **使用 ref 包裹：** 使用 [ref](/reference/advanced/ref) 包裹大数据集以避免被 `Proxy` 代理。

你可以通过以下代码在控制台中直观地感受到这种性能差异：

```tsx
const obj = { name: 'Reactive' };
const proxiedObj = new Proxy(obj, {});

console.time('Normal Object Get');
for(let i = 0; i < 100_000_000; i++) obj.name;
console.timeEnd('Normal Object Get'); // ～50ms, Chrome 131, MacBook Pro (M1 Pro + 16G)

console.time('Proxied Object Get');
for(let i = 0; i < 100_000_000; i++) proxiedObj.name;
console.timeEnd('Proxied Object Get'); // ～1000ms, Chrome 131, MacBook Pro (M1 Pro + 16G)
```
