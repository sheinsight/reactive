import { useCreation } from '@shined/react-use'
import { create } from '..'

import type { SnapshotOptions } from './use-snapshot'

export type UseReactiveOptions<State> = SnapshotOptions<State>

/**
 * A React Hook that helps to use [Reactive](https://sheinsight.github.io/reactive) in React with ease.
 */
export function useReactive<State extends object>(
  initialState: State,
  options: UseReactiveOptions<State>,
): readonly [State, State] {
  const store = useCreation(() => create(initialState))

  return [
    store.useSnapshot({
      sync: options.sync,
      isEqual: options.isEqual,
    }),
    store.mutate,
  ] as const
}
