# Integrate with Redux DevTools {#redux-devtools}

Reactive has out-of-the-box compatibility with [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools).

> [!NOTE]
> To enable DevTools, make sure you've installed [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools) browser extension, full DevTools options can be found at Redux DevTools extension [documentation](https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Arguments.md#options).

You can import `devtools` from `@shined/reactive`, and then enable it as shown below:

```tsx {5}
import { create, devtools } from '@shined/reactive'

const store = create({ count: 1 })

devtools(store, { name: 'MyStore', enable: true })
```
