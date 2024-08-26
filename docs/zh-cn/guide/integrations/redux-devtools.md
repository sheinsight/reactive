# 与 Redux DevTools 的集成

Reactive 与 [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) 兼容开箱即用。

::: tip 提示
要启用 DevTools，请确保已安装 [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) 浏览器扩展。完整的选项可以在 [Redux DevTools](https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Arguments.md#options) 文档中找到。
:::

您可以从 `@shined/reactive` 导入 `devtools` 并按如下方式启用：

```tsx {5}
import { create, devtools } from '@shined/reactive'

const store = create({ count: 1 })

devtools(store, { name: 'awesome-store', enable: true }) // 初始化 store 并启用 devtools
```
