# setGlobalNotifyInSync {#set-global-notify-in-sync}

::: tip 提示
此方法从 `v0.3.0` 版本起可用。
:::

默认情况下，为了兼顾 React 17 及以下版本的整体渲染性能，内部默认采取异步的通知变更方式，即 `useSnapshot` 的 `sync` 选项默认值被设置为 `false` 以使用批处理的模式来合并渲染、优化性能。

如果你希望同步通知变更（将 `useSnapshot`、`useSubscribe` 等的 `sync` 默认设置为 `true`），可以通过 `setGlobalNotifyInSync` 方法来设置全局变更方式默认值。

::: tip 提示

异步通知变更与输入框的 [Composition 事件](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent) 冲突，导致输入框场景下，需要手动指定 `sync` 为 `true` 来避免输入法组词中断。虽然这能解决问题，但也带来了不小的心智负担。

所以如果你使用 React 18 及以上版本，可以全局设置为 `true`，在具备 React 18 内置的合并渲染的同时，也能大幅减轻使用上的心智负担。

:::

```tsx
import { setGlobalNotifyInSync } from '@shined/reactive'

// 在你的项目入口文件中调用，来设置全局通知变更的默认值为同步
setGlobalNotifyInSync(true);
```

::: tip 提示
请注意，为了考虑兼容性和灵活性，`setGlobalNotifyInSync` 设置的是 `sync` 选项的全局**默认值**，如果在使用 `useSnapshot` 或 `useSubscribe` 时显式地传入了 `sync` 选项，则该处的通知行为以传入的 `sync` 选项为准。
:::
