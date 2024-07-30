import { create as createVanilla } from '../vanilla/create.js'
import { useSnapshot } from './use-snapshot.js'

import type { ExpandType } from '../utils/index.js'
import type { StoreCreateOptions, VanillaStore } from '../vanilla/create.js'
import type { SnapshotOptions, SnapshotSelector } from './use-snapshot.js'

export interface StoreUseSnapshot<State> {
  (): State
  (options: SnapshotOptions<State>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>): StateSlice
  <StateSlice>(selector: undefined, options: SnapshotOptions<StateSlice>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>, options: SnapshotOptions<StateSlice>): StateSlice
}

export type Store<State extends object> = ExpandType<
  VanillaStore<State> & {
    useSnapshot: StoreUseSnapshot<State>
  }
>

export function createWithHooks<State extends object>(initialState: State, options?: StoreCreateOptions): Store<State> {
  return withUseSnapshot(createVanilla(initialState, options))
}

export function withUseSnapshot<State extends object>(store: VanillaStore<State>): Store<State> {
  const boundUseSnapshot: StoreUseSnapshot<State> = <StateSlice>(
    selectorOrOption?: SnapshotOptions<StateSlice> | SnapshotSelector<State, StateSlice> | undefined,
    maybeOptions?: SnapshotOptions<StateSlice>,
  ) => {
    let options: SnapshotOptions<StateSlice> | undefined
    let selector: SnapshotSelector<State, StateSlice> | undefined

    if (selectorOrOption && typeof selectorOrOption !== 'function') {
      options = selectorOrOption
      selector = undefined
    } else {
      options = maybeOptions
      selector = selectorOrOption
    }

    return useSnapshot(store.mutate, selector, options)
  }

  return {
    ...store,
    useSnapshot: boundUseSnapshot,
  }
}
