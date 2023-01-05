const run = (want, number, discount) => {
  const answer = want.reduce((acc, cur, index) => ({
    ...acc,
    [cur]: number[index],
  }), {});

  let base;
  let count = 0;

  for (let i = 0; i < discount.length; i++) {
    base = { ...answer };

    for (let j = i; j < i + 10; j++) {
      const current = discount[j];
      if (base[current] === undefined || base[current] === 0) {
        break;
      }

      base[current] = base[current] - 1;
    }

    if (Object.values(base).every(it => it === 0)) {
      count += 1;
    }
  }

  return count;
};

test('run', () => {
  expect(run(
    ['banana', 'apple', 'rice', 'pork', 'pot'],
    [3, 2, 2, 2, 1],
    [
      'chicken', 'apple', 'apple', 'banana', 'rice', 'apple', 'pork',
      'banana', 'pork', 'rice', 'pot', 'banana', 'apple', 'banana',
    ],
  )).toBe(3);

  expect(run(
    ['apple'],
    [10],
    ['banana', 'banana', 'banana', 'banana', 'banana', 'banana', 'banana', 'banana', 'banana', 'banana'],
  )).toBe(0);
});
