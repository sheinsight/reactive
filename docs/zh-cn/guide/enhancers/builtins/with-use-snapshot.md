# withUseSnapshot

::: tip 提示
此增强器已经在 `create` 中内置了，你可以直接通过它创建带有 `useSnapshot` 方法的 `store`。
:::

给 `store` 贡献 `store.useSnapshot()` 方法，用于在 React 组件中获取派生数据最新值，具备渲染优化。

`store.useSnapshot` 的使用详情请参考 [store.useSnapshot](/reference/basic/create#store-use-snapshot)。


```tsx
import { createVanilla, withUseSnapshot } from '@shined/reactive'

const store = withUseSnapshot(
  createVanilla({
    count: 0,
    tab: 'home' as 'home' | 'about',
  }),
)

// 在 React 中，具备渲染优化
const { count, tab } = store.useSnapshot()
const [count, tab] = store.useSnapshot(s => [s.count, s.tab] as const)
```
