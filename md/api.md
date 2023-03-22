# Api

## create

```ts

interface CreateReturn<S> {
    useState():S
    /**
     *  Do we need to use a quote here 🤔 ？
     *  mutate or current 🤔 ？
     *
     * If a one-time reference is not used, the user may directly assign values, and the proxy cannot achieve reactive.
     *
     * */
    current:S;
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
declare function create<S extends object>(state:S):

```
