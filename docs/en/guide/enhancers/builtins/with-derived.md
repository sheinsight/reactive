# withDerived

::: tip TIP
If you are using React, it is recommended to directly use [withUseDerived](/guide/enhancers/builtins/with-use-derived). Due to API limitations, it provides both `store.derived()` and `store.useDerived()` methods for convenient use within React components.
:::

Provides the `store.derived()` method to the `store`, allowing the declaration of derived data once and enabling the retrieval of the latest value of the derived data at any moment.

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
