import { useSnapshot } from './use-snapshot.js'
import { create as createVanilla } from '../vanilla/create.js'

import type { ExpandType } from './../utils/index.js'
import type { Selector, SnapshotOptions } from './use-snapshot.js'
import type { CreateOptions, VanillaStore } from '../vanilla/create.js'

export interface StoreUseSnapshot<State> {
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
  const vanillaStore = createVanilla(initState, options)

  const boundUseSnapshot: StoreUseSnapshot<State> = <StateSlice>(
    selectorOrOption?: SnapshotOptions<StateSlice> | Selector<State, StateSlice> | undefined,
    maybeOptions?: SnapshotOptions<StateSlice>
  ) => {
    let options: SnapshotOptions<StateSlice> | undefined
    let selector: Selector<State, StateSlice> | undefined

    if (selectorOrOption && typeof selectorOrOption !== 'function') {
      options = selectorOrOption
      selector = undefined
    } else {
      options = maybeOptions
      selector = selectorOrOption
    }

    return useSnapshot(vanillaStore.mutate, selector, options)
  }

  return {
    ...vanillaStore,
    useSnapshot: boundUseSnapshot,
  }
}
