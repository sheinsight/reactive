import { createVanilla } from '../vanilla/create.js'
import { withUseSnapshot } from '../enhancers/react/with-use-snapshot.js'
import { withUseSubscribe } from '../enhancers/react/with-use-subscribe.js'

import type { ExpandType } from '../utils/index.js'
import type { StoreCreateOptions, VanillaStore } from '../vanilla/create.js'
import type { SnapshotOptions, SnapshotSelector } from './use-snapshot.js'
import type { WithUseSubscribeContributes } from '../enhancers/react/with-use-subscribe.js'
import type { WithUseSnapshotContributes } from '../enhancers/react/with-use-snapshot.js'

export interface StoreUseSnapshot<State> {
  (): State
  (options: SnapshotOptions<State>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>): StateSlice
  <StateSlice>(selector: undefined, options: SnapshotOptions<StateSlice>): State
  <StateSlice>(selector: SnapshotSelector<State, StateSlice>, options: SnapshotOptions<StateSlice>): StateSlice
}

export type Store<State extends object> = ExpandType<
  VanillaStore<State> & WithUseSnapshotContributes<State> & WithUseSubscribeContributes<State>
>

export function createWithHooks<State extends object>(
  initialState: State,
  options: StoreCreateOptions = {},
): Store<State> {
  return withUseSnapshot(withUseSubscribe(createVanilla<State>(initialState, options)))
}
