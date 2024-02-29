import {
  addProperty,
  asyncChangeName,
  deleteProperty,
  mutateNestedProperty,
  mutateTopProperty,
  popFromArray,
  pushToArray,
  store,
} from './store'

export default function BasicDemo() {
  return (
    <>
      <OperationArea />
      <Children />
      <MainView />
    </>
  )
}

const OperationArea = () => {
  return (
    <>
      <div>
        <button onClick={mutateTopProperty}>mutate top property</button>
        <button onClick={mutateNestedProperty}>mutate nested property</button>
      </div>

      <div>
        <button onClick={addProperty}>add property</button>
        <button onClick={deleteProperty}>delete property</button>
      </div>

      <div>
        <button onClick={pushToArray}>push to array</button>
        <button onClick={popFromArray}>pop from array</button>
      </div>

      <button onClick={asyncChangeName}>async change name</button>
      <button onClick={store.restore}>restore to initial state</button>
    </>
  )
}

const MainView = () => {
  const state = store.useSnapshot({ sync: true })
  const content = JSON.stringify(state, null, 2)

  return (
    <div>
      <h4>Input anything here 👇</h4>
      <input
        type="text"
        value={state.inputValue}
        onChange={(e) => {
          store.mutate.inputValue = e.target.value
        }}
      />
      <h4>Full Store Snapshot 👇</h4>
      <pre style={{ marginBottom: '2rem' }}>{content}</pre>
    </div>
  )
}

const Children = () => {
  const isLoading = store.useSnapshot((s) => s.mutating)
  const { name, city } = store.useSnapshot((s) => ({ name: s.name, city: s.address.city }))
  const [hobbies, text] = store.useSnapshot((s) => [s.hobbies, s.inputValue])

  return (
    <div>
      <h4>Some State Slice 👇</h4>
      <pre>name: {name}</pre>
      <pre>address.city.name: {city.name}</pre>
      <pre>inputValue: {isLoading ? 'loading...' : text}</pre>

      <h4>Hobbies 👇</h4>
      <div>
        {hobbies.map((hobby, idx) => (
          <div key={hobby}>
            {idx + 1}. {hobby}
          </div>
        ))}
      </div>
    </div>
  )
}
