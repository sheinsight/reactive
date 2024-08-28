# withDerived

::: tip 提示
如果你在 React 中使用，建议直接使用 [withUseDerived](../with-use-derived)，出于 API 限制，它会同时贡献 `store.derived()`  和 `store.useDerived()` 方法以方便在 React 组件中使用。
:::

给 `store` 贡献 `store.derived()` 方法，声明一次派生数据，即可在任意时刻获取派生数据最新值。

```tsx
import { create, withDerived } from '@shined/reactive'

const store = withDerived(
  create({
    count: 0,
    tab: 'home' as 'home' | 'about',
  }),
  (s) => ({
    doubleCount: s.count * 2,
    isHome: s.tab === 'home',
  }),
)

const isHome = store.derived().isHome
```
