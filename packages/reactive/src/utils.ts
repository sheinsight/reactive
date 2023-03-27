export type AsyncFunction<
  Arguments extends readonly unknown[] = readonly any[],
  ReturnValue = unknown
> = (...arguments_: Arguments) => Promise<ReturnValue>;
