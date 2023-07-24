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

export const onChange = async () => {
  store.mutate.address.city = {
    ...store.mutate.address.city,
    name: Math.random().toString(),
  };
  store.mutate.name = "张三" + Math.random().toString();
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  store.mutate.address.city.name = Math.random().toString();
};
