import { userStore, loginStore, verifyUser, logout } from './store.ts'

export const MultipleStore = () => {
  const user = userStore.useSnapshot()
  const isLogin = loginStore.useSnapshot((s) => s.isLogin)
  const [username, password] = loginStore.useSnapshot((s) => [s.username, s.password], { sync: true })

  return (
    <>
      <h2>MultipleStore</h2>

      <h4>{isLogin ? 'Welcome, reactive!' : 'Pleace Login First'}</h4>

      {!isLogin && (
        <>
          <input
            name="username"
            type="text"
            placeholder="username: admin"
            value={username}
            onChange={(e) => {
              loginStore.mutate.username = e.target.value
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="password: admin"
            value={password}
            onChange={(e) => {
              loginStore.mutate.password = e.target.value
            }}
          />
        </>
      )}

      {isLogin && <pre>{JSON.stringify(user, null, 2)}</pre>}

      <button type="button" onClick={isLogin ? logout : verifyUser}>
        {isLogin ? 'Logout' : 'Login'}
      </button>
    </>
  )
}
