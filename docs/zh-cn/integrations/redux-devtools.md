# 与 Redux DevTools 集成 {#redux-devtools}

Reactive 具有与 [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) 开箱即用的兼容性。

> [!NOTE] 注意
> 要启用 DevTools，请确保您已经安装了 [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) 浏览器扩展，完整的 DevTools 选项可以在 Redux DevTools 扩展的 [文档](https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Arguments.md#options) 中找到。

您可以从 `@shined/reactive` 导入 `devtools`，然后按照以下方式启用它：

```tsx {5}
import { create, devtools } from '@shined/reactive'

const store = create({ count: 1 })

devtools(store, { name: 'MyStore', enable: true }) // 初始化 store，并启用 devtools
```
