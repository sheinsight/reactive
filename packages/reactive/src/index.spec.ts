import { describe, expect, it } from 'vitest'

import {
  create,
  createVanilla,
  devtools,
  getSnapshot,
  produce,
  ref,
  snapshot,
  subscribe,
  useReactive,
} from './index.js'

describe('index export', () => {
  it('`ref`should be defined', () => expect(ref).toBeDefined())
  it('`devtools`should be defined', () => expect(devtools).toBeDefined())
  it('`subscribe`should be defined', () => expect(subscribe).toBeDefined())
  it('`produce`should be defined', () => expect(produce).toBeDefined())
  it('`snapshot`should be defined', () => expect(snapshot).toBeDefined())
  it('`createVanilla`should be defined', () => expect(createVanilla).toBeDefined())
  it('`getSnapshot`should be defined', () => expect(getSnapshot).toBeDefined())
  it('`create`should be defined', () => expect(create).toBeDefined())
  it('`useReactive`should be defined', () => expect(useReactive).toBeDefined())
})
