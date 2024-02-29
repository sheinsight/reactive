// const state = useSnapshot({ name: 123 });
// const state2 = useSnapshot({ name: 123 }, (s) => s);
// const state3 = useSnapshot({ name: 123 }, (s) => s, {});
// const state4 = useSnapshot({ name: 123 }, {});
// const name = useSnapshot({ name: 123 }, (s) => s.name);
// const name2 = useSnapshot({ name: 123 }, (s) => s.name, {});
// const [name3, age] = useSnapshot({ name: "123", age: 2 }, (s) => [s.name, s.age], {});

// const { name: name4, age: age2 } = useSnapshot({ name: "123", age: 2 }, (s) => ({
//   name: s.name,
//   age: s.age,
// }));

// const store = createWithHooks({ name: "123", age: 2 });
// const state = store.useSnapshot();
// const state2 = store.useSnapshot((s) => s);
// const state3 = store.useSnapshot((s) => s, {});
// const state4 = store.useSnapshot({});
// const name = store.useSnapshot((s) => s.name);
// const name2 = store.useSnapshot((s) => s.name, {});

// const [name3, age] = store.useSnapshot((s) => [s.name, s.age], {});

// const { name: name4, age: age2 } = store.useSnapshot((s) => ({
//   name: s.name,
//   age: s.age,
// }));
