import { create, devtools } from "@shined/reactive";

export const store = create({
  user: {
    address: {
      city: "Bob",
    },
  },
  name: "Bob",
});

devtools(store, { name: "test" });
