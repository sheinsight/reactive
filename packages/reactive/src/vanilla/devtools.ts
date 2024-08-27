import { canProxy, isProduction, noop } from '../utils/index.js'
import { snapshot } from './snapshot.js'
import { subscribe } from './subscribe.js'

import type {} from '@redux-devtools/extension'
import type { DeepExpandType } from '../utils/index.js'

export type ReduxExtension = (Window extends { __REDUX_DEVTOOLS_EXTENSION__?: infer T }
  ? T
  : { connect: (param: any) => any })['connect']

export type ExtConfig = Parameters<ReduxExtension>[0]

// FIXME: https://github.com/reduxjs/redux-devtools/issues/1097
export type ConnectResponse = ReturnType<ReduxExtension> & {
  unsubscribe: () => void
  subscribe: (fn: (message: any) => void) => void
  error: (message: string) => void
}

/** redux devtool options, if set, will enable redux devtool */
export type DevtoolsOptions = DeepExpandType<
  {
    /* name of the store, will be displayed as title in devtool switch panel */
    name: string
    /** @default true */
    enable?: boolean
  } & ExtConfig
>

export function devtools(store: { mutate: object }, options: DevtoolsOptions): () => void {
  // if in production,
  if (isProduction) return noop

  const ext = window.__REDUX_DEVTOOLS_EXTENSION__
  const enable = options?.enable ?? true

  // this variable is used to filter out the mutate operation by devtools itself
  let isMutatingStoreByDevtools = false

  if (!enable) return noop

  if (!ext) {
    const infos = [
      "[Warning] to enable devtools, make sure you've installed Redux devtools extension 👉",
      'https://github.com/reduxjs/redux-devtools#redux-devtools',
    ]

    console.warn(infos.join(' '))

    return noop
  }

  const name = options?.name ?? 'untitled'
  const devtools = ext.connect(options) as ConnectResponse
  const initialState = snapshot(store.mutate)

  devtools.init(initialState)

  devtools.subscribe((message) => {
    console.debug('[reactive] message from devtools: ', message)

    // if (message.type === "START") void 0;
    if (message.type !== 'DISPATCH') return

    if (!message.payload) return

    // if (message.payload.type === "SWEEP") void 0;
    if (message.payload.type === 'RESET') devtools.init(initialState)
    if (message.payload.type === 'COMMIT') devtools.init(snapshot(store.mutate))

    // if (message.payload.type === ""TOGGLE_ACTION"") void 0;
    const actions = ['ROLLBACK', 'JUMP_TO_ACTION'] as const

    const isAction = actions.includes(message.payload.type)
    const hasState = message.state && message.state !== '{}'

    if (isAction && hasState) {
      try {
        isMutatingStoreByDevtools = true

        const newState = JSON.parse(message.state || '{}')
        Object.assign(store.mutate, newState)
        console.debug('[reactive] mutate state by devtools: ', newState)
      } catch (e: any) {
        devtools.error(e?.message || e?.toString() || JSON.stringify(e || ''))
      } finally {
        isMutatingStoreByDevtools = false
      }
    }
  })

  const unsubscribe = subscribe(
    store.mutate,
    (changes, version) => {
      const { propsPath, previous, current, snapshot } = changes

      if (isMutatingStoreByDevtools) return

      const payload = {
        type: `[${canProxy(current) ? 'replace' : 'set'}] ${propsPath}`,
        payload: current,
        _previousValue: previous,
        _updatedAt: new Date().toLocaleString(),
        _innerVersion: version,
      }

      devtools.send(payload, snapshot)
      console.debug(`[reactive] [${name}] [${getActionType(current)}] ${propsPath}`, current)
    },
    true,
  )

  console.debug(`[reactive] [${name}] devtools is enabled`)

  return () => {
    devtools.unsubscribe()
    unsubscribe()
    console.debug(`[reactive] [${name}] devtools is disabled`)
  }
}

function getActionType(state: unknown) {
  return canProxy(state) ? 'replace' : 'set'
}
