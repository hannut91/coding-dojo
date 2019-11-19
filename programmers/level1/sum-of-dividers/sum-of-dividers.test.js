const sumOfDividers = (n) =>
  [...Array(n)]
    .map((_, i) => i + 1)
    .filter(i => n % i === 0)
    .reduce((acc, cur) => acc + cur, 0);

test('sumOfDividers', () => {
  expect(sumOfDividers(12)).toBe(28);
  expect(sumOfDividers(5)).toBe(6);
});
