# setGlobalNotifyInSync

::: tip Tip
This method is available starting from version `v0.3.0`.
:::

By default, to balance overall rendering performance for React 17 and earlier versions, the internal mechanism adopts asynchronous change notification by default. This means the `sync` option of `useSnapshot` is set to `false` by default to use batching mode for merging renders and optimizing performance.

If you want to enable synchronous change notification (setting the default `sync` option to `true` for `useSnapshot`, `useSubscribe`, etc.), you can use the `setGlobalNotifyInSync` method to configure the global default change notification behavior.

::: tip Tip

Asynchronous change notification conflicts with input field [Composition Events](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent), causing input field scenarios to require manually specifying `sync` as `true` to avoid input method composition interruption. While this solves the problem, it also introduces significant mental overhead.

Therefore, if you're using React 18 and above, you can globally set this to `true`. This leverages React 18's built-in render batching while significantly reducing the mental overhead of usage.

:::

```tsx
import { setGlobalNotifyInSync } from '@shined/reactive'

// Call this in your project's entry file to set the global default for change notification to synchronous
setGlobalNotifyInSync(true);
```

::: tip Tip
Please note that for compatibility and flexibility considerations, `setGlobalNotifyInSync` sets the global **default value** for the `sync` option. If you explicitly pass a `sync` option when using `useSnapshot` or `useSubscribe`, the notification behavior will follow the explicitly passed `sync` option.
:::
