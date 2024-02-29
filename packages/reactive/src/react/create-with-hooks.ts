import { useSnapshot } from './use-snapshot.js'
import { create as createVanilla } from '../vanilla/create.js'

import type { CreateOptions } from '../vanilla/create.js'
import type { Selector, SnapshotOptions } from './use-snapshot.js'

interface StoreUseSnapshot<State extends object> {
  (): State
  (options?: SnapshotOptions<State>): State
  <StateSlice>(selector?: Selector<State, StateSlice>): StateSlice
  <StateSlice>(
    selector?: Selector<State, StateSlice>,
    options?: SnapshotOptions<StateSlice>
  ): StateSlice
}

export const createWithHooks = <State extends object>(
  initState: State,
  options?: CreateOptions
) => {
  const store = createVanilla(initState, options)

  const _useSnapshot: StoreUseSnapshot<State> = <StateSlice>(
    selectorOrOption?: SnapshotOptions<StateSlice> | Selector<State, StateSlice>,
    maybeOptions?: SnapshotOptions<StateSlice>
  ) => {
    if (typeof selectorOrOption !== 'function') {
      maybeOptions = selectorOrOption
      selectorOrOption = undefined
    }
    return useSnapshot(store.mutate, selectorOrOption, maybeOptions)
  }

  Object.assign(store, { useSnapshot: _useSnapshot })

  return store as typeof store & { useSnapshot: typeof _useSnapshot }
}
