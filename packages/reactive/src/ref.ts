const internal_refSet = new WeakSet();

export function ref<T extends object>(o: T): T {
  internal_refSet.add(o);
  return o as T;
}

export function hasRef<T extends object>(k: T) {
  return internal_refSet.has(k);
}
