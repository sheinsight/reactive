import { withUseSnapshot, withUseSubscribe } from '../enhancers/react/index.js'
import { withSnapshot, withSubscribe, createVanilla } from '../vanilla/index.js'

import type { ExpandType } from '../utils/index.js'
import type { StoreCreateOptions, VanillaStore } from '../vanilla/create.js'
import type { SnapshotOptions, SnapshotSelector } from './use-snapshot.js'
import type { WithSnapshotContributes, WithSubscribeContributes } from '../vanilla/index.js'
import type { WithUseSnapshotContributes, WithUseSubscribeContributes } from '../enhancers/react/index.js'

export interface StoreUseSnapshot<State> {
  (): State
  (options: SnapshotOptions<State>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>): StateSlice
  <StateSlice>(selector: undefined, options: SnapshotOptions<StateSlice>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>, options: SnapshotOptions<StateSlice>): StateSlice
}

export type Store<State extends object> = ExpandType<
  VanillaStore<State> &
    WithSubscribeContributes<State> &
    WithSnapshotContributes<State> &
    WithUseSnapshotContributes<State> &
    WithUseSubscribeContributes<State>
>

export function createWithHooks<State extends object>(
  initialState: State,
  options: StoreCreateOptions = {},
): Store<State> {
  return withUseSnapshot(withUseSubscribe(withSnapshot(withSubscribe(createVanilla<State>(initialState, options)))))
}
