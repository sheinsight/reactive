import { useSnapshot } from './use-snapshot.js'
import { create as createVanilla } from '../vanilla/create.js'

import type { ExpandType } from './../utils/index.js'
import type { Selector, SnapshotOptions } from './use-snapshot.js'
import type { CreateOptions, VanillaStore } from '../vanilla/create.js'

export type Store<State extends object> = ExpandType<
  VanillaStore<State> & { useSnapshot: UseSnapshot<State> }
>

export interface UseSnapshot<State extends object> {
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
): Store<State> => {
  const store = createVanilla(initState, options)

  const _useSnapshot: UseSnapshot<State> = <StateSlice>(
    selectorOrOption?: SnapshotOptions<StateSlice> | Selector<State, StateSlice>,
    maybeOptions?: SnapshotOptions<StateSlice>
  ) => {
    if (selectorOrOption && typeof selectorOrOption !== 'function') {
      maybeOptions = selectorOrOption
      selectorOrOption = undefined
    }

    return useSnapshot(store.mutate, selectorOrOption, maybeOptions)
  }

  Object.assign(store, { useSnapshot: _useSnapshot })

  return store as typeof store & { useSnapshot: typeof _useSnapshot }
}
