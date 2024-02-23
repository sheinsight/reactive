import { devtools, create } from "@shined/reactive";

interface StoreState {
  name: string;
  age: number;
  hobbies: string[];
  address: {
    city: { name: string };
    [key: string]: unknown;
  };
  inputValue: string;
  mutating: boolean;
  [key: string]: unknown;
}

export const store = create<StoreState>({
  name: "Bob",
  age: 12,
  hobbies: ["basketball", "football"],
  address: {
    city: {
      name: "Shanghai",
    },
  },
  inputValue: "",
  mutating: false,
});

const hash = () => Math.random().toString(16).toUpperCase().slice(2, 8);
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const mutateTopProperty = () => (store.mutate.name = hash());
export const mutateNestedProperty = () => (store.mutate.address.city.name = hash());
export const pushToArray = () => store.mutate.hobbies.push(hash());
export const popFromArray = () => store.mutate.hobbies.pop();

export const addProperty = () => {
  store.mutate.newProperty = hash();
  store.mutate.address.newProperty = hash();
};

export const deleteProperty = () => {
  delete store.mutate.newProperty;
  delete store.mutate.address.newProperty;
};

export const asyncChangeName = async () => {
  if (store.mutate.mutating) return;

  store.mutate.name = "loading...";
  store.mutate.mutating = true;

  await delay(1000);

  store.mutate.name = hash();
  store.mutate.name = hash();
  store.mutate.name = hash();
  store.mutate.name = hash();
  store.mutate.name = hash();

  store.mutate.mutating = false;
};
