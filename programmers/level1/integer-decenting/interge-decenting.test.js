const split = (n, result) => {
  if (n < 10) {
    return [...result, n];
  }

  return split((n - n % 10) / 10, [...result, n % 10])
}

const integerDecnting = (n) =>
  split(n, [])
    .sort((a, b) => a - b)
    .reduce((acc, cur) => ({
      sum: acc.sum + cur * acc.decimal,
      decimal: acc.decimal * 10,
    }), {
      sum: 0,
      decimal: 1,
    })
    .sum;

test('split', () => {
  expect(split(118372, [])).toEqual([2, 7, 3, 8, 1, 1]);
});

test('integerDecnting', () => {
  expect(integerDecnting(118372)).toBe(873211);
});