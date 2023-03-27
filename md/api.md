# Api

## create

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface CreateReturn<S> {
  /**
   * In order to prevent users from accidentally changing the return value of useState, deepReadonly is used.
   **/
  useState(): DeepReadonly<S>;
  /**
   *  Do we need to use a quote here 🤔 ？
   *  mutate or current 🤔 ？
   *
   * If a one-time reference is not used, the user may directly assign values, and the proxy cannot achieve reactive.
   *
   * */
  current: S;
}

/**
 * 1. object: Represents non-primitive types,
 * such as arrays or custom objects.
 * This type is less restrictive, allowing any non-primitive value,
 * but without explicitly defining the object's structure.
 *
 * 2. Record<string, any>: Denotes an object with string keys and values of any type.
 * This type is more specific than 'object', as it requires the object to have string keys,
 * while still allowing values of any type.
 *
 * 3. { [name: string]: any }: Represents an object with string keys and values of any type, similar to Record<string, any>.
 * The distinction lies in the syntax, using an index signature instead of the Record utility type.
 **/
declare function create<S extends object>(state: S): CreateReturn<S>;
```

## createQuery

这个函数通常是用来创建查询函数，内置的状态将包含 request 与 response 两个模块

```ts
import { CreateReturn } from "./create";

type AwaitReturnType<T extends (...args: any) => any> = Await<ReturnType<T>>;

type Services = (...args: any[]) => Promise<any>;

interface CreateQueryState<S> {
  data: S;
  loading: boolean;
}

interface CreateQueryReturn<S extends Services>
  extends CreateReturn<CreateQueryState<AwaitReturnType<S>>> {
  query: S;
  refresh: () => Promise<S>;
}

interface CreateQueryOptions<S> {
  defaultState: S;
  delay: number;
}

type Await<T> = T extends Promise<infer U> ? U : T;

declare function createQuery<S extends Services, State = CreateQueryState<S>>(
  service: S,
  options?: CreateQueryOptions<State>
): CreateQueryReturn<S>;
```
