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
      <Children />
      <Children2 />
      <OperationArea />
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

const Children = () => {
  const state = store.useSnapshot({ sync: true })
  const content = JSON.stringify(state, null, 2)

  return (
    <div>
      <input
        type="text"
        value={state.inputValue}
        onChange={(e) => {
          store.mutate.inputValue = e.target.value
        }}
      />
      <pre style={{ marginBottom: '2rem' }}>{content}</pre>
    </div>
  )
}

const Children2 = () => {
  const res = store.useSnapshot((s) => [s.name, s.address.city])
  const [name, city] = store.useSnapshot((s) => [s.name, s.address.city])

  return (
    <div>
      <h1>{name}</h1>
      <div>{city.name}</div>
    </div>
  )
}
