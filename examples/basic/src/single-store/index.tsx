import { changeInfo, mockFetch, store } from './store.ts'

export const SingeStore = () => {
  const state = store.useSnapshot()
  const status = state.loading ? 'loading...' : 'done'

  return (
    <>
      <h2>SingeStore</h2>

      <div>
        count: <mark>{state.count}</mark>
      </div>
      <div>
        status: <mark>{status}</mark>
      </div>
      <pre>{JSON.stringify(state.info, null, 2)}</pre>
      <button type="button" onClick={() => store.mutate.count++}>
        store.mutate.count++
      </button>
      <button type="button" onClick={changeInfo}>
        store.mutate.date = Date.now()
      </button>
      <button type="button" onClick={mockFetch}>
        async operation
      </button>
    </>
  )
}
