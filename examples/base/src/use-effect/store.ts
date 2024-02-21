import { create } from "@shined/reactive";

export const store = create({
  user: {
    address: {
      city: "Bob",
    },
  },
  name: "Bob",
});
