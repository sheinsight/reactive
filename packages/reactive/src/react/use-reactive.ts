import { useRef } from 'react'
import { deepEqual } from '../utils/index.js'
import { createWithHooks } from './create-with-hooks.js'

import type { DependencyList } from 'react'
import type { SnapshotOptions } from './use-snapshot.js'

export interface UseReactiveOptions<State> extends SnapshotOptions<State> {}

/**
 * A React Hook that helps to use [Reactive](https://sheinsight.github.io/reactive) in React with ease.
 * 
 * @since 0.1.5
 */
export function useReactive<State extends object>(
  initialState: State,
  options: UseReactiveOptions<State> = {},
): readonly [State, State] {
  const store = useCreation(() => createWithHooks(initialState), [initialState])
  return [store.useSnapshot({ ...options }), store.mutate] as const
}

interface CreationRefState<T> {
  value?: T
  created?: boolean
  preDeps?: DependencyList
}

function useCreation<T>(create: () => T, currDeps?: DependencyList): T {
  const { current: creation } = useRef<CreationRefState<T>>({})

  if (!creation.created || !deepEqual(creation.preDeps, currDeps)) {
    creation.value = create()
    creation.created = true
    creation.preDeps = currDeps
  }

  return creation.value as T
}
