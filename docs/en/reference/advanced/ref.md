# ref

Ref is used to create non-proxy objects within a Store (proxy object), which are not managed by the Store (i.e., they are not proxied).

Such state is similar to regular JavaScript objects; they are not tracked, so changes made to them **will not trigger update notifications**. This is suitable for scenarios where you do not want the Store to proxy and track, but you want to ensure a consistent user experience. For example, storing DOM elements, File objects, and other unstructured data.

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

// ✅ You should do this, which is to only change the properties inside the ref object, not the ref object itself
store.tableRef.tableEl = document.getElementById('table');
store.fileRef.file = new File([''], 'example.txt');

// ✅ Then you can operate on the non-proxy state inside, such as reading and writing
store.tableRef.tableEl.addEventListener('click', () => {
  console.log('table clicked');
});
store.fileRef.file.text().then(text => {
  console.log(text);
});

// ❌ Do not change the ref object itself, as it will lead to unexpected behavior
store.tableRef = { tableEl: document.getElementById('table') };
store.fileRef = { file: new File([''], 'example.txt') };
```
