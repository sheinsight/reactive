import { create as createVanilla } from '../vanilla/create.js'
import { withUseSnapshot } from '../enhancers/with-use-snapshot.js'

import type { ExpandType } from '../utils/index.js'
import type { StoreCreateOptions, VanillaStore } from '../vanilla/create.js'
import type { SnapshotOptions, SnapshotSelector } from './use-snapshot.js'
import type { WithSubscribeContributes } from '../enhancers/with-subscribe.js'
import type { WithUseSnapshotContributes } from '../enhancers/with-use-snapshot.js'

export interface StoreUseSnapshot<State> {
  (): State
  (options: SnapshotOptions<State>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>): StateSlice
  <StateSlice>(selector: undefined, options: SnapshotOptions<StateSlice>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>, options: SnapshotOptions<StateSlice>): StateSlice
}

export type Store<State extends object> = ExpandType<
  VanillaStore<State> & WithUseSnapshotContributes<State> & WithSubscribeContributes<State>
>

export function createWithHooks<State extends object>(
  initialState: State,
  options: StoreCreateOptions = {},
): Store<State> {
  return withUseSnapshot<State, VanillaStore<State> & WithSubscribeContributes<State>>(
    createVanilla<State>(initialState, options),
  )
}
