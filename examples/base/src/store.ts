import { create } from "@shined/reactive";

interface StoreState {
  name: string;
  age: number;
  hobbies: string[];
  address: {
    city: { name: string };
    [key: string]: unknown;
  };
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
  mutating: false,
});

const OTP = () => Math.random().toString().slice(2, 8);
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const mutateTopProperty = () => (store.mutate.name = OTP());
export const mutateNestedProperty = () => (store.mutate.address.city.name = OTP());
export const pushToArray = () => store.mutate.hobbies.push(OTP());
export const popFromArray = () => store.mutate.hobbies.pop();

export const addProperty = () => {
  store.mutate.newProperty = OTP();
  store.mutate.address.newProperty = OTP();
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

  store.mutate.name = OTP();
  store.mutate.mutating = false;
};
