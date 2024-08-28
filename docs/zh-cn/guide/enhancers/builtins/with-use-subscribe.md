# withUseSubscribe

::: tip 提示
此增强器已经在 `create` 中内置了，你可以直接通过它创建带有 `useSubscribe` 方法的 `store`。
:::

给 `store` 贡献 `store.useSubscribe()` 方法，用于在 React 组件中订阅 `store` 的状态，卸载时自动取消订阅。

`store.useSubscribe` 的使用详情请参考 [store.useSubscribe](/reference/basic/create#store-use-subscribe)。

```tsx
import { createVanilla, withUseSubscribe } from '@shined/reactive'

const store = withUseSubscribe(
  createVanilla({
    count: 0,
    tab: 'home' as 'home' | 'about',
  }),
)

// 在 React 中订阅 store 的状态，卸载时自动取消订阅
store.useSubscribe((changes) => {
  console.log('store changed:', changes)
})
```
