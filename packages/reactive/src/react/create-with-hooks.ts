import { useSnapshot } from './use-snapshot.js'
import { create as createVanilla } from '../vanilla/create.js'

import type { ExpandType } from './../utils/index.js'
import type { Selector, SnapshotOptions } from './use-snapshot.js'
import type { CreateOptions, VanillaStore } from '../vanilla/create.js'

export type StoreUseSnapshot<State> = {
  (): State
  (options: SnapshotOptions<State>): State
  <StateSlice>(selector: Selector<State, StateSlice>): StateSlice
  <StateSlice>(selector: undefined, options: SnapshotOptions<StateSlice>): State
  <StateSlice>(
    selector: Selector<State, StateSlice>,
    options: SnapshotOptions<StateSlice>
  ): StateSlice
}

export type Store<State extends object> = ExpandType<
  VanillaStore<State> & {
    useSnapshot: StoreUseSnapshot<State>
  }
>

export function createWithHooks<State extends object>(
  initState: State,
  options?: CreateOptions
): Store<State> {
  const store = createVanilla(initState, options)

  const boundedUseSnapshot: StoreUseSnapshot<State> = <StateSlice>(
    selectorOrOption?: SnapshotOptions<StateSlice> | Selector<State, StateSlice> | undefined,
    maybeOptions?: SnapshotOptions<StateSlice>
  ) => {
    if (selectorOrOption && typeof selectorOrOption !== 'function') {
      maybeOptions = selectorOrOption
      selectorOrOption = undefined
    }

    return useSnapshot(store.mutate, selectorOrOption, maybeOptions)
  }

  return {
    ...store,
    useSnapshot: boundedUseSnapshot,
  }
}
