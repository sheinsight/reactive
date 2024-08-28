# withSubscribe

::: tip 提示
此增强器已经在 `create`/`createVanilla` 中内置了，你可以直接通过它们创建带有 `subscribe` 方法的 `store`。
:::

给 `store` 贡献 `store.subscribe()` 方法，获取当前 `store` 的快照数据。

```tsx
import { createVanilla } from '@shined/reactive'

const store = createVanilla({ count: 0 })

// 已经内置了，直接使用 subscribe 方法订阅 store 的状态变更
store.subscribe((changes) => {
  console.log('store changed:', changes)
})
```
