# createSingleLoading {#create-single-loading}

`createSingleLoading` 是一个用于创建一个单例 Loading 的实用函数，提供一种通过多个 Hooks 或 loading 实例管理单个（全局）加载状态的方法，为了保持依赖精简和隔离，你需要从 `/create-single-loading` 导入它。

因为内部依赖了 `@shined/react-use`，请确保你的项目中已经安装了 `@shined/react-use`。

```tsx
import { createSingleLoading } from '@shined/reactive/create-single-loading'

const pageLoading = createSingleLoading(options)
const { set, get, bind, useLoading, useAsyncFn } = pageLoading

// 用法示例
// 创建单一 loading 状态
const pageLoading = createSingleLoading({
  initialValue: false, // 这是默认值
  resetOnError: true, // 这是默认值
})

// 可以在组件外部使用 bind 方法绑定异步函数，同时绑定了单一 loading 状态
const fetchDataOutside = pageLoading.bind(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  throw new Error('error')
})

function App() {
  // 通过 useLoading 获取当前 loading 状态
  const loading = pageLoading.useLoading()

  const fetchFn = pageLoading.useAsyncFn(async () => {
    // 也支持在组件内直接使用 useAsyncFn 创建异步函数，同时绑定了单一 loading 状态
  })

  return (
    <div>
      {loading && <div>Loading...</div>}
      <button onClick={() => fetchFn.run()}>组件内加载</button>
      <button onClick={() => fetchDataOutside()}>组件外加载</button>
    </div>
  )
}
```
