import { proxy } from './proxy.js'
import { subscribe } from './subscribe.js'

export interface CreateOptions {}

export type ObjSelector<T> = ((state: T) => T) | (<S extends object>(state: T) => S)

export function create<T extends object>(initState: T, options?: CreateOptions) {
  const proxyState = proxy(initState)

  const restore = () => {
    const _ = structuredClone(initState)
    Object.keys(_).forEach((k) => void (proxyState[k as keyof T] = _[k as keyof T]))
  }

  options ??= {}

  const _subscribe = (callback: () => void, selector: ObjSelector<T> = (s: T) => s) => {
    return subscribe(selector(proxyState), callback)
  }

  return {
    mutate: proxyState,
    subscribe: _subscribe,
    restore,
  }
}
