# withUseDerived

Empower the `store` with `store.derived()` and `store.useDerived()` methods to declare derived data once, and access its latest value at any time.

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

// In Vanilla JS
const isHome = store.derived().isHome

// In React, with rendering optimizations
const { isHome } = store.useDerived()
```
