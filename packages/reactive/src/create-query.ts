import { AsyncFunction } from "./utils";
import { CreateReturn } from "./create";
import { PartialDeep, AsyncReturnType } from "type-fest";

interface CreateQueryState<S> {
  data: S;
  loading: boolean;
}

interface CreateQueryReturn<S> extends CreateReturn<CreateQueryState<S>> {
  query: S;
  // refresh: () => Promise<S>;
}

interface CreateQueryOptions<S> {
  defaultState?: PartialDeep<S>;
  delay?: number;
}

declare function createQuery<Service extends AsyncFunction>(
  service: Service,
  options?: CreateQueryOptions<AsyncReturnType<Service>>
): CreateQueryReturn<Service>;

const services = async (name: string) => {
  return {
    list: [],
    total: 100,
  };
};

const res = createQuery(services, {
  defaultState: {
    list: [],
    total: 10,
  },
});

res.query("d");
