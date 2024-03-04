import { proxy } from './proxy.js'
import { subscribe } from './subscribe.js'

import type { SubscribeCallback } from './subscribe.js'

export interface CreateOptions {}

export type ObjSelector<State> =
  | ((state: State) => State)
  | (<StoreSlice extends object>(state: State) => StoreSlice)

export type StoreSubscriber<State extends object> = (
  listener: SubscribeCallback<State>,
  sync?: boolean,
  selector?: ObjSelector<State>
) => void

export type VanillaStore<State extends object> = {
  mutate: State
  subscribe: StoreSubscriber<State>
  restore: () => void
}

export function create<State extends object>(
  initState: State,
  options?: CreateOptions
): VanillaStore<State> {
  options ??= {}

  const proxyState = proxy(initState)

  const restore = () => {
    const _ = structuredClone(initState)
    Object.keys(_).forEach((k) => void (proxyState[k as keyof State] = _[k as keyof State]))
  }

  const _subscribe = (
    callback: SubscribeCallback<State>,
    sync: boolean = false,
    selector: ObjSelector<State> = (s: State) => s
  ) => {
    return subscribe<State>(selector(proxyState), callback, sync)
  }

  return {
    mutate: proxyState,
    subscribe: _subscribe,
    restore,
  }
}
