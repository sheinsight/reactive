import { create } from '@shined/reactive';

export const store = create({
  count: 0,
  loading: false,
  info: {
    name: '@shined/reactive',
    author: 'ityuanyu',
    date: Date.now(),
  },
});

export const changeInfo = () => {
  store.mutate.info.date = Date.now();
};

export const mockFetch = async () => {
  store.mutate.loading = true;

  await new Promise((r) => setTimeout(r, 1000));

  store.mutate.loading = false;
};
