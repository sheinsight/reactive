# createSingleLoading

`createSingleLoading` is a utility function for creating a singleton loading instance, offering a method to manage a single (global) loading state across multiple Hooks or loading instances. To maintain streamlined dependencies and isolation, you should import it from `/create-single-loading`.

Since an internal dependency `@shined/react-use` is utilized, please ensure that your project has already installed `@shined/react-use`.

```tsx
import { createSingleLoading } from '@shined/reactive/create-single-loading'

const pageLoading = createSingleLoading(options)
const { set, get, bind, useLoading, useAsyncFn } = pageLoading

// Usage Example
// Create a single loading state
const pageLoading = createSingleLoading({
  initialValue: false, // This is the default value
  resetOnError: true, // This is the default value
})

// You can use the bind method outside of components to bind asynchronous functions while also binding the single loading state
const fetchDataOutside = pageLoading.bind(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  throw new Error('error')
})

function App() {
  // Use useLoading to get the current loading state
  const loading = pageLoading.useLoading()

  const fetchFn = pageLoading.useAsyncFn(async () => {
    // It also supports using useAsyncFn directly inside components to create asynchronous functions while binding the single loading state
  })

  return (
    <div>
      {loading && <div>Loading...</div>}
      <button onClick={() => fetchFn.run()}>Load Inside Component</button>
      <button onClick={() => fetchDataOutside()}>Load Outside Component</button>
    </div>
  )
}
```
