# withUseDerived

给 `store` 贡献 `store.derived()` 和 `store.useDerived()` 方法，声明一次派生数据，即可在任意时刻获取派生数据最新值。

```tsx
import { create, withUseDerived } from '@shined/reactive'

const store = withUseDerived(
  create({
    count: 0,
    tab: 'home' as 'home' | 'about',
  }),
  (s) => ({
    doubleCount: s.count * 2,
    isHome: s.tab === 'home',
  }),
)

// 在 Vanilla JS 中
const isHome = store.derived().isHome

// 在 React 中，具备渲染优化
const { isHome } = store.useDerived()
```
