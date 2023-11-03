const refSet = new WeakSet();

export function ref<T extends object>(o: T): T {
  refSet.add(o);
  return o as T;
}

export function hasRef<T extends object>(k: T) {
  return refSet.has(k);
}
