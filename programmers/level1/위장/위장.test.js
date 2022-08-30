const run = clothes => {
  const clothesMap = clothes.reduce((acc, [name, type]) => {
    const value = acc.get(type);
    if (!value) {
      acc.set(type, [name]);
      return acc;
    }

    acc.set(type, [...value, name]);
    return acc;
  }, new Map());


  return 1;
};

test.skip('run', () => {
  expect(
    run(
      [['yellowhat', 'headgear'], ['bluesunglasses', 'eyewear'], ['green_turban', 'headgear']],
    ),
  ).toBe(5);
});

test('run', () => {
  expect(
    run(
      [['yellowhat', 'headgear']],
    ),
  ).toBe(1);

  expect(
    run(
      [['yellowhat', 'headgear'], ['redhat', 'headgear']],
    ),
  ).toBe(2);
});
