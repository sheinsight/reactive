import { create } from "@shined/reactive";

export const store = create({
  name: "张三",
  address: {
    city: {
      name: "上海",
      age: 12,
    },
  },
});
