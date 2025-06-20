# ref {#ref}

用于在 Store（代理对象） 中创建非代理对象，不会被 Store 管理（即不会被代理）。

这样的状态类似于普通的 JavaScript 对象，它不会被跟踪，所以作用在其上的变化也**不会触发更新通知**，适用于不想被 Store 代理追踪、但是想确保使用体验一致的场景。比如存储 DOM 元素、File 对象等非结构化数据。

## 类型

```ts
export declare function ref<T extends object>(o: T): T
```

## 用法示例

```tsx
import { ref } from '@shined/reactive';

const store = create({ 
  count: 0,
  inputValue: 'Hello',
  fileRef: ref({
    file: null as File | null
  }),
  tableRef: ref({
    tableEl: null as HTMLTableElement | null
  })
});

// ✅ 你应该这样做，即只改变 ref 对象内部的属性，而不是更改 ref 对象本身
store.mutate.tableRef.tableEl = document.getElementById('table');
store.mutate.fileRef.file = new File([''], 'example.txt');

// ✅ 然后可以对内部非代理状态进行操作，读写等
store.mutate.tableRef.tableEl.addEventListener('click', () => {
  console.log('table clicked');
});
store.mutate.fileRef.file.text().then(text => {
  console.log(text);
});

// ❌ 不要更改 ref 对象本身，会导致意外的行为
store.mutate.tableRef = { tableEl: document.getElementById('table') };
store.mutate.fileRef = { file: new File([''], 'example.txt') };
```
