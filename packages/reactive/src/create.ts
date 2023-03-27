import { ReadonlyDeep } from "type-fest";

export interface CreateReturn<S> {
  useState(): ReadonlyDeep<S>;
  current: S;
}

declare function create<S extends object>(state: S): CreateReturn<S>;
